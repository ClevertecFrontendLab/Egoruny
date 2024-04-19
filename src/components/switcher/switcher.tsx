import React from 'react';
import style from './style.module.css';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
type ChildProps = {
    collapse: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const Switcher: React.FC<ChildProps> = ({ collapse, setCollapsed }) => {
    const switcherElement = collapse ? (
        <MenuUnfoldOutlined className={style.switcher} />
    ) : (
        <MenuFoldOutlined className={style.switcher} />
    );

    const screenWidth = window.innerWidth;

    const dataTestId = screenWidth <= 360 ? 'sider-switch-mobile' : 'sider-switch';

    const updatedSwitcherElement = React.cloneElement(switcherElement, {
        onClick: () => setCollapsed(!collapse),
        'data-test-id': dataTestId,
    });

    return <>{updatedSwitcherElement}</>;
};

export default Switcher;
