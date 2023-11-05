import { appRouter } from "@/server/api/root.router";
import { increaseCredits } from "@/server/api/utils/credits";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import {
  AFFILIATE_CREDITS,
  invitationConfirmEmail,
} from "@/utils/general/constants";
import { sendEmail } from "@/utils/nodeMailer/sendMail";
import type { NextApiRequest, NextApiResponse } from "next";

const AffiliateAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const inviterId = (req.query.invite as string).replace("/", "");
  if (!inviterId) {
    res.status(500).end();
  }
  const session = await getServerAuthSession({ req, res });
  if (!session) {
    res.status(500).end();
    return;
  }
  const user = await prisma.user.findFirst({
    where: { id: session?.user.id },
    select: { createdAt: true, affiliateId: true },
  });
  if (!user || user.affiliateId) {
    res.status(500).end();
    return;
  }
  const lim = new Date();
  lim.setSeconds(lim.getSeconds() - 20);
  const isNew = user.createdAt >= lim;
  if (!isNew) {
    res.status(500).end();
    return;
  }
  await prisma.user.update({
    where: { id: session.user.id },
    data: { affiliateId: inviterId },
  });
  await increaseCredits(inviterId, AFFILIATE_CREDITS);

  const inviter = await prisma.user.findFirst({
    where: { id: inviterId },
    select: { name: true, email: true },
  });
  if (!inviter) {
    res.status(500).end();
    return;
  }
  await sendEmail({
    to: inviter.email as string,
    from: process.env.PUBLIC_EMAIL,
    html: invitationConfirmEmail(
      inviter.name,
      session.user.name as string,
      session.user.image as string
    ),
    subject: `${session.user.name} Accepted your invitation`,
  });
  res.redirect("/").end();
};
export default AffiliateAuth;
