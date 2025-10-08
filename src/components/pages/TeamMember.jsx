import { useEffect } from 'react';

const TeamMember = () => {
    useEffect(() => {
        const { ApperUI } = window.ApperSDK;
        ApperUI.showUserInvitation('#authentication-team-member');
    }, []);

    return (
        <>
            <div className="flex-1 py-12 px-5 grid overflow-auto grid-cols-1 justify-center items-center">
                <div className="flex-1 flex-col gap-6 py-12 px-5 flex">
                    <div className="w-full max-w-7xl mx-auto">
                        <div className="flex flex-col gap-2 items-center mb-6">
                            <h1 className="text-2xl font-bold">Team Members</h1>
                            <p className="text-sm text-tertiary">Manage your team members.</p>
                        </div>
                        <div id="authentication-team-member"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeamMember;