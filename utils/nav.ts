import { NavItem } from 'types/nav';
import { IconHome2, IconArrowBackUp, IconApps, IconVocabulary, IconServer, IconDatabasePlus, IconTrowel, IconRowInsertTop, IconDevicesPc } from '@tabler/icons-react';

export const flattenNavItems = (result: { [key: string]: NavItem }, navItems: NavItem[], parentPath = '', level = 0) => {
    level++;
    return navItems.reduce((result, item) => {
        const fullPath = item.path;
        item.parentPath = parentPath;
        item.level = level;
        result[fullPath] = item;
        if (item.subNav) {
            result = flattenNavItems(result, item.subNav, `${fullPath}`, level);
        } else {
            result[fullPath] = item;
        }
        return result;
    }, result);
};

export function getNavAndCurrentPath(router: any) {
    const { pathname } = router;
    const navItems: NavItem[] = [
        {
            name: "概览",
            path: "/overview",
            icon: IconHome2,
        },
        {
            name: "智能体",
            path: "/agent",
            icon: IconApps,
            subNav: [
                {
                    name: "新建智能助手",
                    path: "/agent/[id]/assistant",
                    icon: IconVocabulary,
                },
                {
                    name: "编辑智能助手",
                    path: "/agent/[id]/assistant/[assistantId]",
                    icon: IconVocabulary,
                },
                {
                    name: "新增知识库问答",
                    path: "/agent/[id]/knowledgeBase",
                    icon: IconVocabulary,
                },
                {
                    name: "编辑知识库问答",
                    path: "/agent/[id]/knowledgeBase/[knowledgeBaseId]",
                    icon: IconVocabulary,
                },
                {
                    name: "新增简单问答",
                    path: "/agent/[id]/instructionChat",
                    icon: IconVocabulary,
                },
                {
                    name: "编辑简单问答",
                    path: "/agent/[id]/instructionChat/[instructionChatId]",
                    icon: IconVocabulary,
                }
            ]
        },
       
    ]
    const navItemsMap = flattenNavItems({}, navItems);
    const currentNav: NavItem = navItemsMap[pathname] || {};
    let renderNavList: NavItem[] = navItems;
    // if (currentNav.solo) {
    //     renderNavList = [currentNav]; // 只有一个
    // } else {
    //     renderNavList = Object.keys(navItemsMap).filter((key) => {
    //         const navItem = navItemsMap[key];
    //         return navItem.level === currentNav.level && navItem.parentPath === currentNav.parentPath;
    //     }).map((key) => {
    //         return navItemsMap[key];
    //     })
    // }
    return { renderNavList, currentNav }
}