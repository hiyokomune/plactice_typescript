import styles from './ForList.module.css';
import { Link } from "react-router-dom";
import type { PostType } from './types';

type ForListProps = { // Propsの型を定義
  src: PostType[];
}

export default function ForList({ src }: ForListProps) {
  return (
    <ul className={styles.posts}>
      {src.map((elem) => {
        const date = new Date(elem.createdAt); // String → Dataに型変換
        const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

        return (
          <li key={elem.id} className={styles.post}>
            <Link to ={`post/${elem.id}`}>
              <div className={styles.postInfo}>
                <div className={styles.postCreatedAt}>{formattedDate}</div>
                <div>
                  {elem.categories.map((category) => (
                    <span className={styles.postCategory}>{category}</span>
                  ))}
                </div>
              </div>              

              <p className={styles.postTitle}>{elem.title}</p>
              <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: elem.content }} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
