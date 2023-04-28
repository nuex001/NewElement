import { transporter, mailOptions } from "../../lib/nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

const CONTACT_MESSAGE_FIELDS: {
  [x: string]: any;
  website: any;
  email: any;
  twitter: any;
  instagram: any;
} = {
  website: "Website",
  email: "Email",
  twitter: "Twitter",
  instagram: "Instagram",
};

const generateEmailContent = (data: any) => {
  const stringData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str += `${CONTACT_MESSAGE_FIELDS[key] as any}: \n${val} \n \n`),
    ""
  );
  // const htmlData = Object.entries(data).reduce((str, [key, val]) => {
  //   return (str += `<h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h3><p class="form-answer" align="left">${val}</p>`);
  // }, "");
  const htmlData = `<h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS.website}</h3><p class="form-answer" align="left">${data.website}</p>
  <h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS.email}</h3><p class="form-answer" align="left">${data.email}</p>
  <h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS.twitter}</h3><p class="form-answer" align="left">${data.twitter}</p>
  <h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS.instagram}</h3><p class="form-answer" align="left">${data.Instagram}</p>`;

  return {
    text: stringData,
    html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2>New Contact Message</h2> <div class="form-container">${htmlData}</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`,
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const data: {
      website: string;
      email: string;
      twitter: string;
      instagram: string;
      token: string;
    } = req.body;

    if (!data || !data.email || !data.instagram) {
      return res.status(400).send({ message: "Bad request" });
    }

    const validateHuman = async (token: string): Promise<boolean> => {
      const secret = process.env.NEXT_PUBLIC_RECAPTCHA_SICRET_KEY;
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      console.log(data);

      return data.success;
    };

    const human = await validateHuman(data.token);
    console.log(human);

    if (!human) {
      res.status(400);
      res.json({ errors: ["Please, you're not fooling us, bot."] });
      return;
    }
    try {
      await transporter.sendMail({
        ...mailOptions,
        ...generateEmailContent(data),
        subject: `Application by ${data.instagram}`,
      });
      res.status(201).json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, message: error });
    }
  }
};
export default handler;
