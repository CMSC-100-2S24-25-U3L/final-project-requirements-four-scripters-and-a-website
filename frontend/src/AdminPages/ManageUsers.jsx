import AdminHeader from "../AdminComponents/AdminHeader";
import Filter from "../AdminComponents/ManageUsersFilter";
import UsersSummary from "../AdminComponents/UsersSummary";
import UserTile from "../AdminComponents/UserTile";
import '../css/manage-users.css';

export default function ManageUsers() {
    const usersList = [];
    return(
        <div>
            <AdminHeader />
            <Filter />
            <div className="admin-content-row">
                <UsersSummary />
                <div className="admin-users">
                    {usersList.map((user, index) => {
                        <UserTile />
                    })}
                </div>
                <UserTile /><UserTile />
            </div>
        </div>
    )
}