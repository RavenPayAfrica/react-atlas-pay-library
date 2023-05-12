declare global {
    interface Window {
        AtlasPaySdk: any;
        onload: any;
    }
}
declare function useAtlasPay(tref?: string): any[];
export default useAtlasPay;
