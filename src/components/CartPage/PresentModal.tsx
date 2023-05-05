import type { Dispatch, SetStateAction } from "react";
import React, { useCallback, useState } from "react";
import { BLANK_PROFILE_URL } from "../../pages/_app";
import Modal from "../UI/Modal";
import { debounce } from "lodash";
import { api } from "../../utils/api";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import { useCheckout } from "../../hooks/useCheckoutHooks";

export default function PresentModal({
	showPresentModal,
	setShowPresentModal,
}: {
	showPresentModal: boolean;
	setShowPresentModal: Dispatch<SetStateAction<boolean>>;
}) {
	const [userQuery, setUserQuery] = useState("");
	const [expandedUser, setExpandedUser] = useState<{
		userId: string;
		expanded: boolean;
	}>({ userId: "", expanded: false });
	const {
		data: users,
		mutateAsync: searchUsers,
		isLoading: usersLoading,
	} = api.user.searchFriends.useMutation();

	const { data: entities, isLoading: entitiesLoading } =
		api.entity.getEntities.useQuery(
			{ userId: expandedUser.userId },
			{
				queryKey: ["entity.getEntities", { userId: expandedUser.userId }],
			}
		);
	const { setEntity } = useCheckout();

	const debouncedSearchUsers = useCallback(
		debounce((value) => {
			searchUsers({ name: value });
			console.log(value);
		}, 500),
		[]
	);
	return (
		<Modal
			title="Buy for a friend"
			isOpen={showPresentModal}
			closeModal={() => setShowPresentModal(false)}
		>
			<input
				type="text"
				placeholder="Search..."
				className="mt-4 w-full rounded-none border-[1px] border-gray-400 bg-skin-light-secondary 
          		py-2 pl-5 pr-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
				value={userQuery}
				onChange={(e) => {
					const value = e.currentTarget.value;
					setUserQuery(value);
					debouncedSearchUsers(value);
				}}
			/>
			{usersLoading ? (
				<div className="flex h-48 items-center justify-center">
					<ClipLoader size={20} color="white" />
				</div>
			) : (
				users?.map((user) => (
					<div
						key={user.id}
						className="mt-5 flex w-full flex-col items-center justify-around text-white"
					>
						<button
							className="flex w-full items-center justify-around rounded-md border-2 border-white 
                p-2 duration-150  hover:bg-white/20 active:bg-white/40
                disabled:border-gray-400 disabled:text-gray-400 disabled:hover:bg-transparent"
							onClick={async () => {
								if (expandedUser.userId !== user.id) {
									setExpandedUser({ userId: user.id, expanded: true });
								} else {
									setExpandedUser({
										userId: user.id,
										expanded: !expandedUser.expanded,
									});
								}
							}}
						>
							<Image
								src={user?.image || BLANK_PROFILE_URL}
								width={50}
								height={50}
								className="h-auto w-auto rounded-full"
								alt="user profile image"
							/>
							<h3 className="text-lg text-skin-base">{user.name}</h3>
						</button>
						<div className="mt-3 flex w-full justify-end">
							{expandedUser.userId === user.id &&
								expandedUser.expanded &&
								entities?.map((entity) => (
									<button
										className="flex w-4/5 items-center justify-around rounded-md border-2 
                border-white p-2 duration-150 hover:bg-white/20 active:bg-white/40
                disabled:border-gray-400 disabled:text-gray-400 disabled:hover:bg-transparent"
										key={entity.id}
										onClick={() => {
											const { creatorId, ...minEntity } = entity;
											setEntity(minEntity);
											setShowPresentModal(false);
										}}
									>
										<Image
											src={entity.picture || BLANK_PROFILE_URL}
											width={50}
											height={50}
											className="h-auto w-auto rounded-full"
											alt="user profile image"
										/>
										<h3 className="text-lg text-skin-base">{entity.name}</h3>
									</button>
								))}
						</div>
					</div>
				))
			)}
		</Modal>
	);
}
