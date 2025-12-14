import { useId, useState} from "react";
import styles from './Contact.module.css';

export default function Contact(){
  //　一意なid値を準備
  const id = useId();

  // フォームとして扱う値をStateとして宣言
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // フォーム要素の変更内容をSateに反映
  const handleForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> // inputとtextareaのイベント
  ) => {
    setForm({
      ...form,
      [e.currentTarget.name]: e.currentTarget.value // 型安全のためcurrentTargetを使用
    });
  };
  
  // エラーメッセージをStateとして宣言
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  // 送信中を判定する値をStateとして宣言
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // フォームの値を初期化する関数を定義
  const clearForm = () => {
    setForm({
    name: '',
    email: '',
    message: ''
    });
  };

  // バリデーション処理を行う関数を定義
  const validation = (): boolean => {
    // setErrorsに渡すためのオブジェクトを作成
    const checkedErrors = {
      name: '',
      email: '',
      message: ''
    };
    // nameを判定
    if(form.name === '')
      checkedErrors.name = "お名前は必須です。";
    else if(form.name.length > 30)
      checkedErrors.name = "お名前は30文字以内で入力してください。";
    // emailを判定
    if(form.email === '')
      checkedErrors.email = "メールアドレスは必須です。";
    else if(!form.email.match(/[a-zA-Z0-9]+[a-zA-Z0-9\._-]*@[a-zA-Z0-9_-]+[a-zA-Z0-9\._-]+/))
      checkedErrors.email = "メールアドレスの形式が正しくありません。";
    // messageを判定
    if(form.message === '')
      checkedErrors.message = "本文は必須です。";
    else if(form.message.length > 500)
      checkedErrors.message = "本文は500文字以内で入力してください。";
    
    // エラー内容をsetErrorsに渡す
    setErrors(checkedErrors);
    // エラーメッセージだけの配列に変換
    const errorMessages = Object.values(checkedErrors)
    // エラーがある場合はfalse, ない場合はtrueをreturn 
    if(errorMessages.every(errorMessage => errorMessage === ''))
      return true;
    else
      return false;
  };

  const handleSubmit = async() => {
    // エラーがある場合は早期リターン
    if(!validation()) return;
    
    // エラーがない場合はAPIでフォームを送信
    try {
      setIsSubmitting(true) // 送信開始

      await fetch('https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      alert('送信しました');
      clearForm(); // フォームを初期化
    } catch (e) {
      alert('送信に失敗しました')
    } finally {
      setIsSubmitting(false) // 送信終了
    }
  };

  return(
    <>
      <div className={styles.wrapper}>
        <h1>問合せフォーム</h1>
        <form>
          {/* State値をここのフォーム要素に割り当て */}
          <div className={styles.keyAndValue}>
            <label htmlFor={`${id}-name`}>お名前</label>
            <div className={styles.inputArea}>
              <input id={`${id}-name`} name="name" type="text" maxLength={30} onChange={handleForm} value={form.name} disabled={isSubmitting} />
              <p className={styles.errMsg}>{errors.name}</p> {/* エラーがある時にのみ表示 */}
            </div>
          </div>
          <div className={styles.keyAndValue}>
            <label htmlFor={`${id}-email`}>メールアドレス</label>
            <div className={styles.inputArea}>
              <input id={`${id}-email`} name="email" type="email" onChange={handleForm} value={form.email} disabled={isSubmitting} />
              <p className={styles.errMsg}>{errors.email}</p> {/* エラーがある時にのみ表示 */}
            </div>
          </div>
          <div className={styles.keyAndValue}>
            <label htmlFor={`${id}-message`}>本文</label>
            <div className={styles.inputArea}>
              <textarea id={`${id}-message`} name="message" maxLength={500} onChange={handleForm} value={form.message} disabled={isSubmitting} />
              <p className={styles.errMsg}>{errors.message}</p> {/* エラーがある時にのみ表示 */}
            </div>
          </div>
          <div className={styles.buttons}>
            <button type="button" onClick={handleSubmit} disabled={isSubmitting} className={styles.submitButton}>
              送信
            </button>
            <button type="button" onClick={clearForm} disabled={isSubmitting} className={styles.clearButton}>
              クリア
            </button>
          </div>
        </form>
      </div>
    </>
  );

}


