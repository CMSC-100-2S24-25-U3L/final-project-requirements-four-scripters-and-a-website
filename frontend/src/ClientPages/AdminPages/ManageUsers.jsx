import AdminHeader from "../../components/AdminHeader";
import Filter from "../../components/ManageUsersFilter";
import UsersSummary from "../../components/UsersSummary";
import UserTile from "../../components/UserTile";
import '../../css/manage-users.css';

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