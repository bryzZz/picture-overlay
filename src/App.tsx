import React, { useRef } from "react";
import { Header, Preview, Settings, Upload } from "./components";
import { store } from "./store";
import { observer } from "mobx-react-lite";
import { Button } from "./components/Button/Button";

export const App: React.FC = observer(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleGetImage = () => {
        const link = document.createElement("a");
        link.download = `${store.filename || "download"}.png`;
        link.href = canvasRef.current!.toDataURL();
        link.click();
    };

    const showMainUpload = !store.mainImg,
        showOverlayUpload = !store.overlayImg,
        showPreview = !!store.mainImg,
        showSettings = store.mainImg && store.overlayImg;

    return (
        <div className="App">
            <Header />
            <div className="container App__container">
                <div className="App__side">
                    {showMainUpload && (
                        <Upload onChangeImgData={store.handleChangeMainImg}>
                            Drag&Drop or click here to upload main image
                        </Upload>
                    )}
                    {showPreview && <Preview canvasRef={canvasRef} />}
                </div>
                <div className="App__side App__settings">
                    {showOverlayUpload && (
                        <Upload onChangeImgData={store.handleChangeOverlayImg}>
                            Drag&Drop or click here to upload watermark
                        </Upload>
                    )}
                    {showSettings && (
                        <>
                            <Settings />
                            <Button className="App__submit" onClick={handleGetImage}>
                                Get Image
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
});
