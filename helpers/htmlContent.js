const date = new Date;
const d = date.toLocaleDateString();
const number = Math.floor(Math.random() * 10000);

function htmlContent({ name, email, address }) {
  return (
    `<table
      align="center"
      role="presentation"
      cellSpacing="0"
      cellPadding="0"
      border="0"
      width="100%"
      style="max-width:37.5em;margin:10px auto;width:600px;border:1px solid #E5E5E5"
    >
      <tr style="width:100%">
        <td>    
          <table
            style="padding:40px 74px;text-align:center"
            align="center"
            border="0"
            cellPadding="0"
            cellSpacing="0"
            role="presentation"
            width="100%"
          >
            <tbody>
              <tr>
                <td>
                  <h1 style="font-size:32px;line-height:1.3;font-weight:700;text-align:center;letter-spacing:-1px;color:black">
                    Dear ${name}.
                  </h1>
                  <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500">
                  Thank you for choosing E-Chairs for your furniture needs! We are thrilled to confirm your recent order.
                  </p>
                  <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500;margin-top:24px">
                    Below are the details of your purchase:
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
          <table
            style="padding-left:40px;padding-right:40px;padding-top:22px;padding-bottom:22px"
            align="center"
            border="0"
            cellPadding="0"
            cellSpacing="0"
            role="presentation"
            width="100%"
          >
            <tbody>
              <tr>
                <td>
                  <p style="font-size:15px;line-height:2;margin:0;font-weight:bold;color:black">
                    Shipping to: ${address}
                  </p>
                  <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500">
                    Contact Email: ${email}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
          <table
            style="padding-left:40px;padding-top:22px;padding-bottom:22px"
            align="center"
            border="0"
            cellPadding="0"
            cellSpacing="0"
            role="presentation"
            width="100%"
          >
            <tbody>
              <tr>
                <td>
                  <table
                    width="100%"
                    style="display:flex;margin-bottom:40px"
                    align="center"
                    role="presentation"
                    cellSpacing="0"
                    cellPadding="0"
                    border="0"
                  >
                    <tbody style="width:100%">
                      <tr style="width:100%">
                        <td style="padding-right:15px">
                          <p style="font-size:14px;line-height:2;margin:0;font-weight:bold">
                            Order Number
                          </p>
                          <p style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F">
                          ${number}
                          </p>
                        </td>
                        <td style="padding-right:15px">
                          <p style="font-size:14px;line-height:2;margin:0;font-weight:bold">
                            Order Date
                          </p>
                          <p style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F">
                            ${d}
                          </p>
                        </td>
                        <td>
                          <p style="font-size:14px;line-height:2;margin:0;font-weight:bold">
                            Delivery Address:
                          </p>
                          <p style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F">
                            ${address}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
          <table
            style="padding:40px 74px;text-align:center"
            align="left"
            border="0"
            cellPadding="0"
            cellSpacing="0"
            role="presentation"
            width="100%"
          >
            <tbody>
              <tr>
                <td>
                  <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500">
                  Your order is now being processed, and we will notify you once it has been shipped. We are 
                  committed to providing you with a smooth and timely shopping experience.
                  </p>
                  <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500;margin-top:24px">
                  Thank you for choosing E-Chairs, where comfort meets style. We look forward to delivering quality 
                  chairs that elevate your space. Stay tuned for updates on your order's progress!
                  </p>
                  <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500;margin-top:24px">
                  Best regards,
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
          <table
            style="padding-top:22px;padding-bottom:22px"
            align="center"
            border="0"
            cellPadding="0"
            cellSpacing="0"
            role="presentation"
            width="100%"
          >
            <tbody>
              <tr>
                <td>
                  <table
                    width="100%"
                    style="width:166px;margin:auto"
                    align="center"
                    role="presentation"
                    cellSpacing="0"
                    cellPadding="0"
                    border="0"
                  >
                    <tbody style="width:100%">
                      <tr style="width:100%">
                        <td>
                          <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">
                            Privacy Policy
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center;padding-top:30px;padding-bottom:30px">
                    Please contact us if you have any questions. (If you reply
                    to this email, we won&#x27;t be able to see it.)
                  </p>
                  <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">
                    © 2023 E-Chairs, Inc. All Rights Reserved.
                  </p>
                  <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">
                    E-Chairs, INC.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </table>`
  );
};

module.exports = htmlContent;