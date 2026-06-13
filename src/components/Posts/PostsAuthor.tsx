/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { selectAllUsers } from "../../state/slices/usersSlice";

const PostAuthor = (userId: any) => {
    const users = useSelector(selectAllUsers)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const author = users?.find((user:any) => user.id === userId?.userId);
    return <span>by {author ? author.name : "Anonymous Author"}</span>
}

export default PostAuthor