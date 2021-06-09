import s from "./CheckEmail.module.scss";
import latter from "./../../../assets/images/letter.png";
import Logo from "../../../n1-main/m1-ui/common/logo/Logo";

type CheckEmailType = {
    email?: string
}

export const CheckEmail = (props: CheckEmailType) => {
    return (
        <div className={s.page}>
            <div className={s.wrap}>
                <Logo/>
                <img className={s.latterImg} src={latter} alt="latter-icon"/>
                <h2 className={s.title}>Check Email</h2>
                <div className={s.text}>{`We have sent an Email with with instructions to ${props.email}`}</div>
            </div>
        </div>
    )
}