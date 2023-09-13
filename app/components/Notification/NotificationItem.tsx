
import Image from 'next/legacy/image';

interface props {
    item: any,
    showDetail: (item: any) => void,
    removeItem: (item: any) => void,
}

const NotificationItem: React.FC<props> = ({item, showDetail, removeItem}) => {
    const showNotification = () => {
        // go 
        showDetail(item);
    }

    const readNotification = async (e: any) => {
        e.stopPropagation();
        removeItem(item);
    }

    return (
        <div
            onClick={showNotification} 
            className="flex gap-2 cursor-pointer group">
            <div className="h-6 w-6 flex-none rounded-full overflow-hidden">
                <Image src={item?.author?.image} className="object-cover" alt="avatar" width={100} height={100} />
            </div>
            <div className="flex-1 relative">
                <p className="whitespace-nowrap overflow-hidden text-ellipsis w-[185px] text-sm text-current dark:text-white pr-4">{item.message}</p>
                <p className="text-xs text-black/40 dark:text-darkmuted">5m ago</p>
                <button 
                    onClick={readNotification}
                    type="button" 
                    className="absolute top-1 dark:text-white/80 right-0 hidden group-hover:block hover:opacity-80 rotate-0 hover:rotate-180 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3.5 h-3.5">
                        <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z" fill="currentColor"></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default NotificationItem;