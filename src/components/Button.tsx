import { IconType } from "react-icons"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary"
    size?: "small" | "medium" | "large" | "inherit"
    rounded?: boolean
    outlined?: boolean
    icon?: IconType
    text?: string
    iconPosition?: "start" | "end"
}

export const Button = ({ variant = "primary", size = "medium", rounded = false, outlined = false, icon: Icon, text, iconPosition = "start", ...rest }: ButtonProps) => {
    return (
        <button
            {...rest}
            className={`
                ${variant === "primary" && !outlined && " bg-blue-500 hover:bg-blue-400 text-white"}
                ${variant === "secondary" && !outlined && " bg-slate-800 hover:bg-slate-700 text-white"}
                ${variant === "primary" && outlined && " border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"}
                ${variant === "secondary" && outlined && " border-2 border-slate-800 text-slate-800 hover:bg-slate-700 hover:text-white"}
                ${size === "small" && " text-xs font-semibold"}
                ${size === "medium" && " text-sm"}
                ${size === "large" && " text-base"}
                ${rounded ? " rounded-full" : " rounded"}
                py-2 px-6 tracking-wider flex items-center gap-2
                disabled:bg-gray-400 disabled:text-white cursor-pointer
                disabled:pointer-events-none active:scale-95 leading-none
                disabled:border-none
            `}>
            {
                Icon && iconPosition === "start" &&
                <Icon
                    className={`
                        ${size === "small" && " text-sm"}
                        ${size === "medium" && " text-base"}
                        ${size === "medium" && " text-lg"}
                        mb-0.5
                    `}
                />
            }
            {text}
            {
                Icon && iconPosition === "end" &&
                <Icon
                    className={`
                        ${size === "small" && " text-sm"}
                        ${size === "medium" && " text-base"}
                        ${size === "medium" && " text-lg"}
                        mb-0.5
                    `}
                />
            }
        </button>
    )
}