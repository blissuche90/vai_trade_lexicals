import sendgrid from '@sendgrid/mail';
import config from '../config';

sendgrid.setApiKey(config.SENDGRID_APY_KEY);

export const templates = {
  buyOrderMatched: config.SENDGRID_BUYORDER_MATCHED,
  checkoutSuccess: config.SENDGRID_SUCCESSFUL_CHECKOUT,
  passwordReset: config.SENDGRID_PASSWORD_RESET
};

export const sendMail = ({ email: to, template, ...variables }) => {
  sendgrid.send({
    to,
    from: {
      email: 'support@ezetradein.com',
      name: 'Ezewholesale'
    },
    templateId: template,
    dynamicTemplateData: variables
  });
};
