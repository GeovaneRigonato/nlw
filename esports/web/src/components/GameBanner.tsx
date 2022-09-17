interface GameBannerProps {
    bannerUrl: string;
    title: string;
    adsCount: number;

}

function testAdsCount(adsCount: number) {
    if (adsCount === 1) {
        return 'anúncio';
    } else {
        return 'anúncios';
    }
}
export function GameBanner(props: GameBannerProps) {
    return (
        <a href="" className='relative rounded-lg overflow-hidden'>
            <img src={props.bannerUrl} alt="" />
            <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
                <strong className='font-bold text-white block'>{props.title}</strong>
                <span className='text-zinc-300 text-sm block'>{props.adsCount} {testAdsCount(props.adsCount)}</span>
            </div>
        </a>
    )
}