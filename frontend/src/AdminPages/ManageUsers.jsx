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
            <div className="content-row">
                <UsersSummary />
                <div className="users">
                    {usersList.map((user, index) => {
                        <UserTile />
                    })}
                </div>
            </div>
        </div>
    )
}