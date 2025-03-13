import FilerobotImageEditor, {
  TABS,
  TOOLS,
  type FilerobotImageEditorConfig,
} from "react-filerobot-image-editor";

export default function ImageEditor({
  config,
}: {
  config: FilerobotImageEditorConfig;
}) {
  return (
    <FilerobotImageEditor
      source={config.source}
      getCurrentImgDataFnRef={config.getCurrentImgDataFnRef}
      Rotate={{ angle: 90, componentType: "buttons" }}
      Crop={{
        ratio: 1,
        noPresets: true,
      }}
      showCanvasOnly={true}
      tabsIds={[TABS.ADJUST, TABS.FILTERS, TABS.RESIZE]}
      defaultTabId={TABS.ADJUST}
      defaultToolId={TOOLS.CROP}
      savingPixelRatio={config.savingPixelRatio}
      previewPixelRatio={config.previewPixelRatio}
    />
  );
}
