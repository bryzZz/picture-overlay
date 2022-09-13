import React, { useRef } from "react";
import { Header, Preview, Settings, Upload } from "./components";
import { AppContextProvider } from "./context";
import { useSettings } from "./hooks";

export const App: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const settings = useSettings();

    const handleGetImage = () => {
        const link = document.createElement("a");
        link.download = `${settings.filename || "download"}.png`;
        link.href = canvasRef.current!.toDataURL();
        link.click();
    };

    return (
        <AppContextProvider value={settings}>
            <div className='App'>
                <Header />
                <div className='container App__container'>
                    <div className='App__side'>
                        {!settings.mainImg && (
                            <Upload
                                onChangeImgData={settings.handleChangeMainImg}
                            />
                        )}
                        {settings.mainImg && <Preview canvasRef={canvasRef} />}
                    </div>
                    <div className='App__side App__settings'>
                        {!settings.overlayImg && (
                            <Upload
                                onChangeImgData={
                                    settings.handleChangeOverlayImg
                                }
                            />
                        )}
                        <Settings />
                        <button
                            className='App__submit'
                            onClick={handleGetImage}
                        >
                            Get Image
                        </button>
                    </div>
                </div>
            </div>
        </AppContextProvider>
    );
};
