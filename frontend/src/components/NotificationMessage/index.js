import style from './NotificationMessage.module.css'

const NotoficationMessage = ({
    type,
    message
}) => {
    return <p className={style[`${type}-notification`]}>{message}</p>;
}

export default NotoficationMessage;