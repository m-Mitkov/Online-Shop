import { useContext } from 'react';

import { Context } from '../Store';

const usePermissions = () => {
    const { auth } = useContext(Context);
    const [user] = auth;
    const permissions = user.getIn(['permissions']);
  
    return [permissions]
};

export default usePermissions;