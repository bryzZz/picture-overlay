import React, { useRef } from "react";
import { Header, Preview, Settings, Upload } from "./components";
import { store } from "./store";
import { observer } from "mobx-react-lite";

export const App: React.FC = observer(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleGetImage = () => {
        const link = document.createElement("a");
        link.download = `${store.filename || "download"}.png`;
        link.href = canvasRef.current!.toDataURL();
        link.click();
    };

    return (
        <div className="App">
            <Header />
            <div className="container App__container">
                <div className="App__side">
                    {!store.mainImg && <Upload onChangeImgData={store.handleChangeMainImg} />}
                    {store.mainImg && <Preview canvasRef={canvasRef} />}
                </div>
                <div className="App__side App__settings">
                    {!store.overlayImg && <Upload onChangeImgData={store.handleChangeOverlayImg} />}
                    <Settings />
                    <button className="App__submit" onClick={handleGetImage}>
                        Get Image
                    </button>
                </div>
            </div>
        </div>
    );
});
