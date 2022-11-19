import { SVGProps } from "react"

interface Props {
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    title: string
    onClick?: () => void
}

function ProfileSidebarRow({ Icon, title, onClick }: Props) {
    return (
        <div onClick={() => onClick?.()} className="flex max-w-fit items-center space-x-2 px-4 py-3 cursor-pointer 
        rounded-full hover:bg-secondary transition-all duration-200 group">
            <Icon className="h-6 w-6" />
            <p className="hidden text-base font-light md:inline-flex lg:text-xl">{title}</p>
        </div>
    )
}

export default ProfileSidebarRow
