const functions = require("firebase-functions");
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.sendPassChangeEmail = functions.https.onCall(async(data,context) =>{
	const toMail = data.toEmail;
	const msg = {
		subject : "Password Updated on the Invigilator App",
		text : `This is to inform you that the password of the account ${toMail} has been updated.`
	}
	return admin.firestore().collection('email_collection').add({to:toMail, message:msg});
});

exports.sendExamBooked = functions.https.onCall(async(data, context) => {
	const toMail = data.toEmail;
	const msg = {
		subject : `New Exam Scheduled! on ${data.date}`,
		html : `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
		<head>
		<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
		<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
		<meta content="width=device-width" name="viewport"/>
		<!--[if !mso]><!-->
		<meta content="IE=edge" http-equiv="X-UA-Compatible"/>
		<!--<![endif]-->
		<title></title>
		<!--[if !mso]><!-->
		<link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css"/>
		<!--<![endif]-->
		<style type="text/css">
				body {
					margin: 0;
					padding: 0;
				}
		
				table,
				td,
				tr {
					vertical-align: top;
					border-collapse: collapse;
				}
		
				* {
					line-height: inherit;
				}
		
				a[x-apple-data-detectors=true] {
					color: inherit !important;
					text-decoration: none !important;
				}
			</style>
		<style id="media-query" type="text/css">
				@media (max-width: 620px) {
		
					.block-grid,
					.col {
						min-width: 320px !important;
						max-width: 100% !important;
						display: block !important;
					}
		
					.block-grid {
						width: 100% !important;
					}
		
					.col {
						width: 100% !important;
					}
		
					.col_cont {
						margin: 0 auto;
					}
		
					img.fullwidth,
					img.fullwidthOnMobile {
						max-width: 100% !important;
					}
		
					.no-stack .col {
						min-width: 0 !important;
						display: table-cell !important;
					}
		
					.no-stack.two-up .col {
						width: 50% !important;
					}
		
					.no-stack .col.num2 {
						width: 16.6% !important;
					}
		
					.no-stack .col.num3 {
						width: 25% !important;
					}
		
					.no-stack .col.num4 {
						width: 33% !important;
					}
		
					.no-stack .col.num5 {
						width: 41.6% !important;
					}
		
					.no-stack .col.num6 {
						width: 50% !important;
					}
		
					.no-stack .col.num7 {
						width: 58.3% !important;
					}
		
					.no-stack .col.num8 {
						width: 66.6% !important;
					}
		
					.no-stack .col.num9 {
						width: 75% !important;
					}
		
					.no-stack .col.num10 {
						width: 83.3% !important;
					}
		
					.video-block {
						max-width: none !important;
					}
		
					.mobile_hide {
						min-height: 0px;
						max-height: 0px;
						max-width: 0px;
						display: none;
						overflow: hidden;
						font-size: 0px;
					}
		
					.desktop_hide {
						display: block !important;
						max-height: none !important;
					}
				}
			</style>
		<style id="icon-media-query" type="text/css">
				@media (max-width: 620px) {
					.icons-inner {
						text-align: center;
					}
		
					.icons-inner td {
						margin: 0 auto;
					}
				}
			</style>
		</head>
		<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;">
		<!--[if IE]><div class="ie-browser"><![endif]-->
		<table bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;" valign="top" width="100%">
		<tbody>
		<tr style="vertical-align: top;" valign="top">
		<td style="word-break: break-word; vertical-align: top;" valign="top">
		<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#FFFFFF"><![endif]-->
		<div style="background-color:transparent;">
		<div class="block-grid" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
		<div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
		<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
		<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:transparent;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
		<div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
		<div class="col_cont" style="width:100% !important;">
		<!--[if (!mso)&(!IE)]><!-->
		<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
		<!--<![endif]-->
		<div class="mobile_hide">
		<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
		<tbody>
		<tr style="vertical-align: top;" valign="top">
		<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
		<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="40" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 40px; width: 100%;" valign="top" width="100%">
		<tbody>
		<tr style="vertical-align: top;" valign="top">
		<td height="40" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
		</tr>
		</tbody>
		</table>
		</td>
		</tr>
		</tbody>
		</table>
		</div>
		<!--[if (!mso)&(!IE)]><!-->
		</div>
		<!--<![endif]-->
		</div>
		</div>
		<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
		<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
		</div>
		</div>
		</div>
		<div style="background-color:transparent;">
		<div class="block-grid" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #ffffff;">
		<div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
		<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
		<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#ffffff;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 20px; padding-top:5px; padding-bottom:5px;"><![endif]-->
		<div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
		<div class="col_cont" style="width:100% !important;">
		<!--[if (!mso)&(!IE)]><!-->
		<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 20px;">
		<!--<![endif]-->
		<div align="center" class="img-container center fixedwidth" style="padding-right: 25px;padding-left: 25px;">
		<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 25px;padding-left: 25px;" align="center"><![endif]-->
		<div style="font-size:1px;line-height:25px"> </div><img align="center" alt="Image" border="0" class="center fixedwidth" src="https://firebasestorage.googleapis.com/v0/b/invigilator-82e71.appspot.com/o/public%2FImage.png?alt=media&token=d7835b2e-ba86-4f48-af84-5c2e0ee6e2ed" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 210px; display: block;" title="Image" width="210"/>
		<div style="font-size:1px;line-height:25px"> </div>
		<!--[if mso]></td></tr></table><![endif]-->
		</div>
		<!--[if (!mso)&(!IE)]><!-->
		</div>
		<!--<![endif]-->
		</div>
		</div>
		<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
		<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
		</div>
		</div>
		</div>
		<div style="background-color:transparent;">
		<div class="block-grid" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #FFFFFF;">
		<div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
		<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]-->
		<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#FFFFFF;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 35px; padding-left: 35px; padding-top:35px; padding-bottom:40px;"><![endif]-->
		<div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
		<div class="col_cont" style="width:100% !important;">
		<!--[if (!mso)&(!IE)]><!-->
		<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:35px; padding-bottom:40px; padding-right: 35px; padding-left: 35px;">
		<!--<![endif]-->
		<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
		<div style="color:#132F40;font-family:Cabin, Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
		<div class="txtTinyMce-wrapper" style="font-size: 12px; line-height: 1.2; color: #132F40; font-family: Cabin, Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
		<p style="margin: 0; font-size: 22px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 26px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 22px;">Hello User, a new Exam has been scheduled<br/></span></p>
		</div>
		</div>
		<!--[if mso]></td></tr></table><![endif]-->
		<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 5px; padding-bottom: 30px; font-family: Arial, sans-serif"><![endif]-->
		<div style="color:#555555;font-family:Cabin, Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.5;padding-top:5px;padding-right:10px;padding-bottom:30px;padding-left:10px;">
		<div class="txtTinyMce-wrapper" style="font-size: 12px; line-height: 1.5; color: #555555; font-family: Cabin, Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 18px;">
		<p style="margin: 0; font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin-top: 0; margin-bottom: 0;">
			Subject: ${data.subject}, <br>
			Date: ${data.date}, <br>
			Time: ${data.time}, <br>
			Room: ${data.room}, <br>
			Location: ${data.Location}, <br>
			Faculty: ${data.fac}, <br>
			Is Scheduled for Classes : ${data.classes}
		</p>
		</div>
		</div>
		<!--[if mso]></td></tr></table><![endif]-->
		<div align="center" class="img-container center fixedwidth" style="padding-right: 0px;padding-left: 0px;">
		<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt="Image" border="0" class="center fixedwidth" src="https://firebasestorage.googleapis.com/v0/b/invigilator-82e71.appspot.com/o/public%2Fillo.png?alt=media&token=87592394-1907-4f29-9a0a-5c67c35fbb67" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 530px; display: block;" title="Image" width="530"/>
		<!--[if mso]></td></tr></table><![endif]-->
		</div>
		<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
		<div style="color:#555555;font-family:Cabin, Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:20px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
		<div class="txtTinyMce-wrapper" style="font-size: 12px; line-height: 1.2; color: #555555; font-family: Cabin, Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
		<p style="margin: 0; font-size: 16px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 19px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 16px;">Thanks so much for joining our site! </span><br/><span style="font-size: 16px;">Schedule Ahead for the Exam</span></p>
		</div>
		</div>
		<!--[if mso]></td></tr></table><![endif]-->
		<!--[if (!mso)&(!IE)]><!-->
		</div>
		<!--<![endif]-->
		</div>
		</div>
		<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
		<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
		</div>
		</div>
		</div>
		<div style="background-color:transparent;">
		<div class="block-grid" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
		<div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
		<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
		<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:transparent;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
		<div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
		<div class="col_cont" style="width:100% !important;">
		<!--[if (!mso)&(!IE)]><!-->
		<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
		<!--<![endif]-->
		<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
		<tbody>
		<tr style="vertical-align: top;" valign="top">
		<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
		<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="30" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 30px; width: 100%;" valign="top" width="100%">
		<tbody>
		<tr style="vertical-align: top;" valign="top">
		<td height="30" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
		</tr>
		</tbody>
		</table>
		</td>
		</tr>
		</tbody>
		</table>
		<!--[if (!mso)&(!IE)]><!-->
		</div>
		<!--<![endif]-->
		</div>
		</div>
		<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
		<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
		</div>
		</div>
		</div>
		
		<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
		</td>
		</tr>
		</tbody>
		</table>
		<!--[if (IE)]></div><![endif]-->
		</body>
		</html>`
	}
	return admin.firestore().collection('email_collection').add({to:toMail, message:msg});
})


exports.newChangeRequest = functions.https.onCall(async(data, context) => {
	const toMail = data.toEmail;
	const msg = {
		subject : `New Change Request has arrived for exam on ${data.date}`,
		html : `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
		<head>
		<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
		<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
		<meta content="width=device-width" name="viewport"/>
		<!--[if !mso]><!-->
		<meta content="IE=edge" http-equiv="X-UA-Compatible"/>
		<!--<![endif]-->
		<title></title>
		<!--[if !mso]><!-->
		<link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css"/>
		<!--<![endif]-->
		<style type="text/css">
				body {
					margin: 0;
					padding: 0;
				}
				table,
				td,
				tr {
					vertical-align: top;
					border-collapse: collapse;
				}
				* {
					line-height: inherit;
				}
				a[x-apple-data-detectors=true] {
					color: inherit !important;
					text-decoration: none !important;
				}
			</style>
		<style id="media-query" type="text/css">
				@media (max-width: 620px) {
					.block-grid,
					.col {
						min-width: 320px !important;
						max-width: 100% !important;
						display: block !important;
					}
					.block-grid {
						width: 100% !important;
					}
					.col {
						width: 100% !important;
					}
					.col_cont {
						margin: 0 auto;
					}
					img.fullwidth,
					img.fullwidthOnMobile {
						max-width: 100% !important;
					}
					.no-stack .col {
						min-width: 0 !important;
						display: table-cell !important;
					}
					.no-stack.two-up .col {
						width: 50% !important;
					}
					.no-stack .col.num2 {
						width: 16.6% !important;
					}
					.no-stack .col.num3 {
						width: 25% !important;
					}
					.no-stack .col.num4 {
						width: 33% !important;
					}
					.no-stack .col.num5 {
						width: 41.6% !important;
					}
					.no-stack .col.num6 {
						width: 50% !important;
					}
					.no-stack .col.num7 {
						width: 58.3% !important;
					}
					.no-stack .col.num8 {
						width: 66.6% !important;
					}
					.no-stack .col.num9 {
						width: 75% !important;
					}
					.no-stack .col.num10 {
						width: 83.3% !important;
					}
					.video-block {
						max-width: none !important;
					}
					.mobile_hide {
						min-height: 0px;
						max-height: 0px;
						max-width: 0px;
						display: none;
						overflow: hidden;
						font-size: 0px;
					}
					.desktop_hide {
						display: block !important;
						max-height: none !important;
					}
				}
			</style>
		<style id="icon-media-query" type="text/css">
				@media (max-width: 620px) {
					.icons-inner {
						text-align: center;
					}
					.icons-inner td {
						margin: 0 auto;
					}
				}
			</style>
		</head>
		<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;">
		<!--[if IE]><div class="ie-browser"><![endif]-->
		<table bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;" valign="top" width="100%">
		<tbody>
		<tr style="vertical-align: top;" valign="top">
		<td style="word-break: break-word; vertical-align: top;" valign="top">
		<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#FFFFFF"><![endif]-->
		<div style="background-color:transparent;">
		<div class="block-grid" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
		<div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
		<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
		<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:transparent;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
		<div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
		<div class="col_cont" style="width:100% !important;">
		<!--[if (!mso)&(!IE)]><!-->
		<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
		<!--<![endif]-->
		<div class="mobile_hide">
		<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
		<tbody>
		<tr style="vertical-align: top;" valign="top">
		<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
		<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="40" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 40px; width: 100%;" valign="top" width="100%">
		<tbody>
		<tr style="vertical-align: top;" valign="top">
		<td height="40" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
		</tr>
		</tbody>
		</table>
		</td>
		</tr>
		</tbody>
		</table>
		</div>
		<!--[if (!mso)&(!IE)]><!-->
		</div>
		<!--<![endif]-->
		</div>
		</div>
		<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
		<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
		</div>
		</div>
		</div>
		<div style="background-color:transparent;">
		<div class="block-grid" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #ffffff;">
		<div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
		<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
		<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#ffffff;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 20px; padding-top:5px; padding-bottom:5px;"><![endif]-->
		<div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
		<div class="col_cont" style="width:100% !important;">
		<!--[if (!mso)&(!IE)]><!-->
		<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 20px;">
		<!--<![endif]-->
		<div align="center" class="img-container center fixedwidth" style="padding-right: 25px;padding-left: 25px;">
		<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 25px;padding-left: 25px;" align="center"><![endif]-->
		<div style="font-size:1px;line-height:25px"> </div><img align="center" alt="Image" border="0" class="center fixedwidth" src="https://firebasestorage.googleapis.com/v0/b/invigilator-82e71.appspot.com/o/public%2FImage.png?alt=media&token=d7835b2e-ba86-4f48-af84-5c2e0ee6e2ed" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 210px; display: block;" title="Image" width="210"/>
		<div style="font-size:1px;line-height:25px"> </div>
		<!--[if mso]></td></tr></table><![endif]-->
		</div>
		<!--[if (!mso)&(!IE)]><!-->
		</div>
		<!--<![endif]-->
		</div>
		</div>
		<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
		<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
		</div>
		</div>
		</div>
		<div style="background-color:transparent;">
		<div class="block-grid" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #FFFFFF;">
		<div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
		<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]-->
		<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#FFFFFF;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 35px; padding-left: 35px; padding-top:35px; padding-bottom:40px;"><![endif]-->
		<div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
		<div class="col_cont" style="width:100% !important;">
		<!--[if (!mso)&(!IE)]><!-->
		<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:35px; padding-bottom:40px; padding-right: 35px; padding-left: 35px;">
		<!--<![endif]-->
		<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
		<div style="color:#132F40;font-family:Cabin, Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
		<div class="txtTinyMce-wrapper" style="font-size: 12px; line-height: 1.2; color: #132F40; font-family: Cabin, Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
		<p style="margin: 0; font-size: 22px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 26px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 22px;">Hello User, you have a new change request for the exam :<br/></span></p>
		</div>
		</div>
		<!--[if mso]></td></tr></table><![endif]-->
		<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 5px; padding-bottom: 30px; font-family: Arial, sans-serif"><![endif]-->
		<div style="color:#555555;font-family:Cabin, Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.5;padding-top:5px;padding-right:10px;padding-bottom:30px;padding-left:10px;">
		<div class="txtTinyMce-wrapper" style="font-size: 12px; line-height: 1.5; color: #555555; font-family: Cabin, Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 18px;">
		<p style="margin: 0; font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin-top: 0; margin-bottom: 0;">
			Subject: ${data.subject}, <br>
			Date: ${data.date}, <br>
			Time: ${data.time}, <br>
			Room: ${data.room}, <br> <br>
			Faculty: ${data.fac} <br>
		</p>
		</div>
		</div>
		<!--[if mso]></td></tr></table><![endif]-->
		<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
		<div style="color:#555555;font-family:Cabin, Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:20px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
		<div class="txtTinyMce-wrapper" style="font-size: 12px; line-height: 1.2; color: #555555; font-family: Cabin, Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
		<p style="margin: 0; font-size: 16px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 19px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 16px;">Thanks so much for joining our site! </span><br/><span style="font-size: 16px;">Login to <a href="https://invigilator.web.app">The Invigilator</a> to respond to the request</span></p>
		</div>
		</div>
		<!--[if mso]></td></tr></table><![endif]-->
		<!--[if (!mso)&(!IE)]><!-->
		</div>
		<!--<![endif]-->
		</div>
		</div>
		<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
		<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
		</div>
		</div>
		</div>
		<div style="background-color:transparent;">
		<div class="block-grid" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
		<div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
		<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
		<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:transparent;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
		<div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
		<div class="col_cont" style="width:100% !important;">
		<!--[if (!mso)&(!IE)]><!-->
		<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
		<!--<![endif]-->
		<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
		<tbody>
		<tr style="vertical-align: top;" valign="top">
		<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
		<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="30" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 30px; width: 100%;" valign="top" width="100%">
		<tbody>
		<tr style="vertical-align: top;" valign="top">
		<td height="30" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
		</tr>
		</tbody>
		</table>
		</td>
		</tr>
		</tbody>
		</table>
		<!--[if (!mso)&(!IE)]><!-->
		</div>
		<!--<![endif]-->
		</div>
		</div>
		<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
		<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
		</div>
		</div>
		</div>
		<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
		</td>
		</tr>
		</tbody>
		</table>
		<!--[if (IE)]></div><![endif]-->
		</body>
		</html>`
	}
	return admin.firestore().collection('email_collection').add({to:toMail, message:msg});
})


exports.responseEmail = functions.https.onCall(async(data, context) => {
	const toMail = data.toEmail;
	const msg = {
		subject : `Request has been updated`,
		html : `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
		<head>
		<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
		<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
		<meta content="width=device-width" name="viewport"/>
		<!--[if !mso]><!-->
		<meta content="IE=edge" http-equiv="X-UA-Compatible"/>
		<!--<![endif]-->
		<title></title>
		<!--[if !mso]><!-->
		<link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css"/>
		<!--<![endif]-->
		<style type="text/css">
				body {
					margin: 0;
					padding: 0;
				}
				table,
				td,
				tr {
					vertical-align: top;
					border-collapse: collapse;
				}
				* {
					line-height: inherit;
				}
				a[x-apple-data-detectors=true] {
					color: inherit !important;
					text-decoration: none !important;
				}
			</style>
		<style id="media-query" type="text/css">
				@media (max-width: 620px) {
					.block-grid,
					.col {
						min-width: 320px !important;
						max-width: 100% !important;
						display: block !important;
					}
					.block-grid {
						width: 100% !important;
					}
					.col {
						width: 100% !important;
					}
					.col_cont {
						margin: 0 auto;
					}
					img.fullwidth,
					img.fullwidthOnMobile {
						max-width: 100% !important;
					}
					.no-stack .col {
						min-width: 0 !important;
						display: table-cell !important;
					}
					.no-stack.two-up .col {
						width: 50% !important;
					}
					.no-stack .col.num2 {
						width: 16.6% !important;
					}
					.no-stack .col.num3 {
						width: 25% !important;
					}
					.no-stack .col.num4 {
						width: 33% !important;
					}
					.no-stack .col.num5 {
						width: 41.6% !important;
					}
					.no-stack .col.num6 {
						width: 50% !important;
					}
					.no-stack .col.num7 {
						width: 58.3% !important;
					}
					.no-stack .col.num8 {
						width: 66.6% !important;
					}
					.no-stack .col.num9 {
						width: 75% !important;
					}
					.no-stack .col.num10 {
						width: 83.3% !important;
					}
					.video-block {
						max-width: none !important;
					}
					.mobile_hide {
						min-height: 0px;
						max-height: 0px;
						max-width: 0px;
						display: none;
						overflow: hidden;
						font-size: 0px;
					}
					.desktop_hide {
						display: block !important;
						max-height: none !important;
					}
				}
			</style>
		<style id="icon-media-query" type="text/css">
				@media (max-width: 620px) {
					.icons-inner {
						text-align: center;
					}
					.icons-inner td {
						margin: 0 auto;
					}
				}
			</style>
		</head>
		<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;">
		<!--[if IE]><div class="ie-browser"><![endif]-->
		<table bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;" valign="top" width="100%">
		<tbody>
		<tr style="vertical-align: top;" valign="top">
		<td style="word-break: break-word; vertical-align: top;" valign="top">
		<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#FFFFFF"><![endif]-->
		<div style="background-color:transparent;">
		<div class="block-grid" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
		<div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
		<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
		<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:transparent;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
		<div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
		<div class="col_cont" style="width:100% !important;">
		<!--[if (!mso)&(!IE)]><!-->
		<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
		<!--<![endif]-->
		<div class="mobile_hide">
		<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
		<tbody>
		<tr style="vertical-align: top;" valign="top">
		<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
		<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="40" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 40px; width: 100%;" valign="top" width="100%">
		<tbody>
		<tr style="vertical-align: top;" valign="top">
		<td height="40" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
		</tr>
		</tbody>
		</table>
		</td>
		</tr>
		</tbody>
		</table>
		</div>
		<!--[if (!mso)&(!IE)]><!-->
		</div>
		<!--<![endif]-->
		</div>
		</div>
		<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
		<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
		</div>
		</div>
		</div>
		<div style="background-color:transparent;">
		<div class="block-grid" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #ffffff;">
		<div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
		<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
		<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#ffffff;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 20px; padding-top:5px; padding-bottom:5px;"><![endif]-->
		<div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
		<div class="col_cont" style="width:100% !important;">
		<!--[if (!mso)&(!IE)]><!-->
		<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 20px;">
		<!--<![endif]-->
		<div align="center" class="img-container center fixedwidth" style="padding-right: 25px;padding-left: 25px;">
		<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 25px;padding-left: 25px;" align="center"><![endif]-->
		<div style="font-size:1px;line-height:25px"> </div><img align="center" alt="Image" border="0" class="center fixedwidth" src="https://firebasestorage.googleapis.com/v0/b/invigilator-82e71.appspot.com/o/public%2FImage.png?alt=media&token=d7835b2e-ba86-4f48-af84-5c2e0ee6e2ed" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 210px; display: block;" title="Image" width="210"/>
		<div style="font-size:1px;line-height:25px"> </div>
		<!--[if mso]></td></tr></table><![endif]-->
		</div>
		<!--[if (!mso)&(!IE)]><!-->
		</div>
		<!--<![endif]-->
		</div>
		</div>
		<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
		<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
		</div>
		</div>
		</div>
		<div style="background-color:transparent;">
		<div class="block-grid" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #FFFFFF;">
		<div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
		<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]-->
		<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#FFFFFF;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 35px; padding-left: 35px; padding-top:35px; padding-bottom:40px;"><![endif]-->
		<div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
		<div class="col_cont" style="width:100% !important;">
		<!--[if (!mso)&(!IE)]><!-->
		<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:35px; padding-bottom:40px; padding-right: 35px; padding-left: 35px;">
		<!--<![endif]-->
		<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
		<div style="color:#132F40;font-family:Cabin, Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
		<div class="txtTinyMce-wrapper" style="font-size: 12px; line-height: 1.2; color: #132F40; font-family: Cabin, Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
		<p style="margin: 0; font-size: 22px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 26px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 22px;">Hello User, Your request has been updated.<br/></span></p>
		</div>
		</div>
		<!--[if mso]></td></tr></table><![endif]-->
		<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 5px; padding-bottom: 30px; font-family: Arial, sans-serif"><![endif]-->
		<div style="color:#555555;font-family:Cabin, Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.5;padding-top:5px;padding-right:10px;padding-bottom:30px;padding-left:10px;">
		<div class="txtTinyMce-wrapper" style="font-size: 12px; line-height: 1.5; color: #555555; font-family: Cabin, Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 18px;">
		<p style="margin: 0; font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin-top: 0; margin-bottom: 0;">
			Your request for change of faculty for Exam on ${data.date} has been ${data.status}
		</p>
		</div>
		</div>
		<!--[if mso]></td></tr></table><![endif]-->
		<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
		<div style="color:#555555;font-family:Cabin, Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:20px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
		<div class="txtTinyMce-wrapper" style="font-size: 12px; line-height: 1.2; color: #555555; font-family: Cabin, Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
		<p style="margin: 0; font-size: 16px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 19px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 16px;">Thanks so much for joining our site! </span><br/><span style="font-size: 16px;">Login to <a href="https://invigilator.web.app">The Invigilator</a> to see more details</span></p>
		</div>
		</div>
		<!--[if mso]></td></tr></table><![endif]-->
		<!--[if (!mso)&(!IE)]><!-->
		</div>
		<!--<![endif]-->
		</div>
		</div>
		<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
		<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
		</div>
		</div>
		</div>
		<div style="background-color:transparent;">
		<div class="block-grid" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
		<div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
		<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
		<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:transparent;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
		<div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
		<div class="col_cont" style="width:100% !important;">
		<!--[if (!mso)&(!IE)]><!-->
		<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
		<!--<![endif]-->
		<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
		<tbody>
		<tr style="vertical-align: top;" valign="top">
		<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
		<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="30" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 30px; width: 100%;" valign="top" width="100%">
		<tbody>
		<tr style="vertical-align: top;" valign="top">
		<td height="30" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
		</tr>
		</tbody>
		</table>
		</td>
		</tr>
		</tbody>
		</table>
		<!--[if (!mso)&(!IE)]><!-->
		</div>
		<!--<![endif]-->
		</div>
		</div>
		<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
		<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
		</div>
		</div>
		</div>
		<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
		</td>
		</tr>
		</tbody>
		</table>
		<!--[if (IE)]></div><![endif]-->
		</body>
		</html>`
	}
	return admin.firestore().collection('email_collection').add({to:toMail, message:msg});
})
