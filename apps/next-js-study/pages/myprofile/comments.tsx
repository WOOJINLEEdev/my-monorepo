import Link from "next/link";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { ReactElement } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import useFormatDate from "hooks/useFormatDate";

import { authOptions } from "pages/api/auth/[...nextauth]";
import MyProfileLayout from "components/myprofile/MyProfileLayout";

import { myCommentsState } from "state/comment";
import { IMyComment } from "types";

const MyComments = () => {
  const myComments = useRecoilValue(myCommentsState);

  const { date, time } = useFormatDate();

  return (
    <MyProfileLayout>
      <div className="board_header">
        <span>{myComments.length}개의 글이 있습니다.</span>
      </div>
      <ul>
        {myComments.length > 0 ? (
          myComments.map((comment: IMyComment, i: number) => (
            <ListItem key={`my_comment_${i}`}>
              <div className="post_info" tabIndex={0}>
                <strong className="list_title">{comment.comment}</strong>

                <div className="date">
                  <span>
                    {date} {time}
                  </span>
                </div>

                <Link
                  href="/posts/[id]"
                  as={`/posts/${comment.postId}`}
                  passHref
                >
                  <p className="post_title">{comment.postTitle}</p>
                </Link>
              </div>
            </ListItem>
          ))
        ) : (
          <li className="no_data_item">
            <p className="no_data">작성글이 없습니다.</p>
          </li>
        )}
      </ul>
    </MyProfileLayout>
  );
};

MyComments.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions,
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default MyComments;

const ListItem = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 56px;
  padding: 11px 0;
  border-bottom: 0.5px solid #e6e6e6;
  word-break: break-word;
  word-wrap: break-word;

  &:last-child {
    border-bottom: 0;
    padding-bottom: 25px;
  }

  .post_info {
    width: 100%;
    cursor: pointer;

    .post_title {
      display: -webkit-box;
      overflow: hidden;
      padding-top: 7px;
      color: #979797;
      font-size: 13px;
      word-break: break-all;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }

  .list_title {
    width: 100%;
    height: 20px;
    padding-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .date {
    padding-top: 7px;
    font-size: 12px;
    color: #979797;
  }
`;
