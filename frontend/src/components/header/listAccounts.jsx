import api from '../../api';
import dashIcon from '../../pictures/dashboard.png';
import postIcon from '../../pictures/post.png';
import messagesIcon from '../../pictures/messages.png';

import addIcon from '../../pictures/add.png';
import InstaIcon from '../../pictures/IN.png';
import LinkedIcon from '../../pictures/LI.png';
import RedditIcon from '../../pictures/RE.png';
import XIcon from '../../pictures/X.png';

export const fetchAccounts = async ( navigateToDashboard, navigateToMessages, navigateToPost ) => {
  try {
    const res = await api.get(`/api/user/accounts/`);
    const accountsData = res.data;
    // Manually add pages and set icons for each account
    const accountsWithPages = accountsData.map((account) => {
      let accountName, accountIcon;

      // Switch case to determine accountName and accountIcon
      switch (account.type) {
        case 'IN':
          accountName = 'Instagram';
          accountIcon = InstaIcon;
          break;
        case 'LI':
          accountName = 'LinkedIn';
          accountIcon = LinkedIcon;
          break;
        case 'RE':
          accountName = 'Reddit';
          accountIcon = RedditIcon;
          break;
        case 'TW':
          accountName = 'X';
          accountIcon = XIcon;
          break;
        default:
          accountName = 'Unknown';
          accountIcon = addIcon;
      }

      return {
        ...account,
        name: accountName,
        icon: accountIcon,
        pages: [
          { name: 'Dashboard', action: () => navigateToDashboard(account.type), icon: dashIcon },
          { name: 'Posts', action: () => navigateToPost(account.type), icon: postIcon },
          { name: 'Messages', action: () => navigateToMessages(account.type), icon: messagesIcon },
        ],
      };
    });

    return accountsWithPages;
  } catch (error) {
    console.error("There was an error fetching accounts", error);
    throw error;
  }
};
