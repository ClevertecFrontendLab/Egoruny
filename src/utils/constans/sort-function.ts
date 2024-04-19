import { inviteStaus } from './inviteStatus';

export const sortedUsers = (list, searchStr: string) => {
    const sortedList = [...list].sort((a, b) => a.name.localeCompare(b.name));
    const acceptedUsers = sortedList.filter((e) => e.status === inviteStaus.accepted);
    const rejectedUsers = sortedList.filter((e) => e.status === inviteStaus.regected);
    const otherUsers = sortedList.filter(
        (e) => e.status !== inviteStaus.regected && e.status !== inviteStaus.accepted,
    );
    const filtered = acceptedUsers
        .concat(otherUsers)
        .concat(rejectedUsers)
        .filter((e) => e.name.toLowerCase().includes(searchStr.toLowerCase()));

    return filtered;
};
