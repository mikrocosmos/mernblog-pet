import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import axios from "../axios";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { getPosts, getTags } from "../redux/slices/posts";

export const Home = () => {
	const dispatch = useDispatch();
	const { posts, tags } = useSelector((state) => state.posts);
	const isPostsLoading = posts.status === "loading";
	const isTagsLoading = posts.status === "loading";

	React.useEffect(() => {
		dispatch(getPosts());
		dispatch(getTags());
	}, [dispatch]);

	return (
		<>
			<Tabs
				style={{ marginBottom: 15 }}
				value={0}
				aria-label="basic tabs example">
				<Tab label="Новые" />
				<Tab label="Популярные" />
			</Tabs>
			<Grid container spacing={4}>
				<Grid xs={8} item>
					{(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
						isPostsLoading ? (
							<Post isLoading={true} key={index} />
						) : (
							<Post
								_id={obj._id}
								key={obj._id}
								title={obj.title}
								imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
								user={obj.author}
								createdAt={obj.createdAt}
								viewsCount={obj.viewsCount}
								commentsCount={3}
								tags={obj.tags}
								isEditable
							/>
						)
					)}
				</Grid>
				<Grid xs={4} item>
					<TagsBlock
						items={tags.items.filter((item, pos) => {
							return tags.items.indexOf(item) === pos;
						})}
						isLoading={isTagsLoading}
					/>
					<CommentsBlock
						items={[
							{
								user: {
									fullName: "Вася Пупкин",
									avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
								},
								text: "Это тестовый комментарий",
							},
							{
								user: {
									fullName: "Иван Иванов",
									avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
								},
								text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
							},
						]}
						isLoading={false}
					/>
				</Grid>
			</Grid>
		</>
	);
};