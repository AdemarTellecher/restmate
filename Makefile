dev:
	wails dev -browser -tags webkit2_41

linux:
	wails build -clean -tags webkit2_41

windows:
	wails build -clean -nsis -webview2 embed

darwin:
	wails build -clean
