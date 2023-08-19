import './Button.scss'
import { ButtonType } from 'types/ButtonType'
import classNames from 'classnames'
import { useMemo } from 'react'
import useSlots from 'hooks/useSlots'

type ButtonProps = {
    children?: React.ReactNode
    disabled?: boolean
    href?: string
    label?: string
    target?: string
    type?: ButtonType
}

function Button(props: ButtonProps) {
    const slots = useSlots(props.children)

    const buttonClass = classNames({
        button: true,
        'button--disabled': props.disabled,
        'button--primary': props.type == ButtonType.Primary || !props.type,
        'button--secondary': props.type == ButtonType.Secondary,
    })

    const tabIndex = useMemo(() => {
        return props.disabled ? -1 : 0
    }, [props.disabled])

    return (
        <a
            aria-disabled={props.disabled}
            className={buttonClass}
            href={props.href}
            tabIndex={tabIndex}
            target={props.target}
        >
            {slots['left'] && <span className="button__left">{slots['left']}</span>}

            {slots['default'] || <span className="button__label">{props.label}</span>}

            {slots['right'] && <span className="button__right">{slots['right']}</span>}
        </a>
    )
}

export default Button
