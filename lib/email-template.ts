type Detail = {
  label: string;
  value: string;
};

type NotificationEmailInput = {
  eyebrow: string;
  title: string;
  intro: string;
  summaryLabel: string;
  summaryValue: string;
  details: Detail[];
  message?: string;
};

const colors = {
  ink: "#082e8a",
  coal: "#061a55",
  paper: "#f5f8ff",
  bone: "#ffffff",
  teal: "#1495d3",
  saffron: "#2bb7f0",
  line: "#d9e6f7",
  muted: "#586987"
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildDetailRows(details: Detail[]) {
  return details
    .map(
      (detail) => `
        <tr>
          <td style="padding: 14px 0; border-bottom: 1px solid ${colors.line}; color: ${colors.muted}; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; width: 145px;">
            ${escapeHtml(detail.label)}
          </td>
          <td style="padding: 14px 0; border-bottom: 1px solid ${colors.line}; color: ${colors.coal}; font-size: 15px; font-weight: 800; line-height: 22px;">
            ${escapeHtml(detail.value || "Not provided")}
          </td>
        </tr>
      `
    )
    .join("");
}

export function buildNotificationEmail(input: NotificationEmailInput) {
  return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(input.title)}</title>
  </head>
  <body style="margin: 0; padding: 0; background: ${colors.paper}; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: ${colors.paper}; margin: 0; padding: 30px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 680px; background: ${colors.bone}; border: 1px solid ${colors.line}; border-collapse: collapse;">
            <tr>
              <td style="padding: 0; background: ${colors.coal};">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 22px 24px;">
                      <div style="display: inline-block; padding: 8px 11px; background: ${colors.bone}; color: ${colors.ink}; font-size: 12px; font-weight: 900; letter-spacing: 1.8px; text-transform: uppercase;">
                        Domestic Staffing Hub
                      </div>
                      <div style="margin-top: 18px; color: ${colors.saffron}; font-size: 12px; font-weight: 900; letter-spacing: 2.5px; text-transform: uppercase;">
                        ${escapeHtml(input.eyebrow)}
                      </div>
                      <h1 style="margin: 8px 0 0; color: ${colors.bone}; font-size: 27px; line-height: 34px; font-weight: 900;">
                        ${escapeHtml(input.title)}
                      </h1>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding: 24px;">
                <p style="margin: 0; color: ${colors.muted}; font-size: 15px; line-height: 24px;">
                  ${escapeHtml(input.intro)}
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 22px; border: 1px solid ${colors.line}; background: #f9fbff;">
                  <tr>
                    <td style="padding: 18px;">
                      <div style="color: ${colors.muted}; font-size: 12px; font-weight: 900; letter-spacing: 1.6px; text-transform: uppercase;">
                        ${escapeHtml(input.summaryLabel)}
                      </div>
                      <div style="margin-top: 6px; color: ${colors.ink}; font-size: 24px; line-height: 30px; font-weight: 900;">
                        ${escapeHtml(input.summaryValue)}
                      </div>
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 18px; border-collapse: collapse;">
                  ${buildDetailRows(input.details)}
                </table>

                ${
                  input.message
                    ? `
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 22px; background: ${colors.paper}; border-left: 4px solid ${colors.teal};">
                        <tr>
                          <td style="padding: 18px;">
                            <div style="color: ${colors.muted}; font-size: 12px; font-weight: 900; letter-spacing: 1.6px; text-transform: uppercase;">Message</div>
                            <div style="margin-top: 8px; color: ${colors.coal}; font-size: 16px; line-height: 26px; font-weight: 700;">
                              ${escapeHtml(input.message)}
                            </div>
                          </td>
                        </tr>
                      </table>
                    `
                    : ""
                }

              </td>
            </tr>

            <tr>
              <td style="padding: 16px 24px; background: #eef5ff; border-top: 1px solid ${colors.line};">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="color: ${colors.muted}; font-size: 12px; line-height: 18px;">
                      Domestic Staffing Hub website notification
                    </td>
                    <td align="right" style="color: ${colors.muted}; font-size: 12px; line-height: 18px;">
                      Sent from website form
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `;
}
