# jQuery.cb-getmaps.js

##＜概要＞

「住所」「場所名」「緯度経度」から位置情報を取得し、Google Maps APIを使って地図を表示させるjQueryプラグイン


##＜実装方法＞

###1. 外部ファイルを読み込む
jQuery、Google Maps JavaScript API、当プラグインをページに読み込みます。
```html
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="//maps.googleapis.com/maps/api/js?sensor=true"></script>
<script src="jquery.cbgetmaps.min.js"></script>
```

※Google Maps APIの読み込み方については、以下も併せてご確認ください。

[Google Maps JavaScript API v3スタートガイド](https://developers.google.com/maps/documentation/javascript/tutorial?hl=ja)

###2. 位置情報を取得する

「class="cb-getlocation"」を指定した要素のtitle属性に、「住所」、「場所」、「緯度,経度」情報を設定

####ex.1 住所を入力
```html
<a href="#" class="cb-getlocation" title="東京都新宿区西新宿２−８−１">東京都庁</a></p>
```

####ex.2 場所を入力
```html
<p class="cb-getlocation" title="東京都庁">東京都庁</p>
```

####ex.3 [緯度,経度]を入力
```html
<p class="cb-getlocation" title="35.689599,139.692090">東京都庁</p>
```

※緯度経度情報はGooleマップの任意の場所で右クリックし、「ここの場所について」を選択すると表示されます。



###3. 地図を表示する

地図を表示したい要素に「class="cb-mapcanvas"」を指定

####ex.1
```html
<div class="cb-mapcanvas"></div>
```

####ex.2 取得と表示を同じ要素内で行ってもOK
```html
<div class="cb-getmap cb-mapcanvas" title="35.689599,139.692090"></div>
```

###4. 2と3をグループ化する

位置情報の取得用の要素と地図表示用の要素をグループ化し、プラグインを実行するためのセレクター（ここでは「class="cb-getmap"」）を設定

####ex.1 基本スタイル
```html
<div class="cb-getmap">
	<p><a href="#" class="cb-getlocation" title="東京都新宿区西新宿２−８−１">東京都庁</a></p>
	<div class="cb-mapcanvas"></div>
</div>
```

####ex.2 取得と表示を同じ要素内で行った場合
```html
<div class="cb-getmap">
	<div class="cb-getlocation cb-mapcanvas" title="35.689599,139.692090"></div>
</div>
```

###5. プラグインを実行する

位置情報を取得するclass属性cb−getmapを指定した要素のjQueryオプジェクトに対し、cbGetMapsメソッドを指定

```html
<script>
$(".cb-getmap").cbGetMaps();
</script>
```

####オプション

オプションの指定の仕方は以下の通り

```js
$(".cb-getmap").cbGetMaps({
	map_location_name: ".cb-getlocation",
	map_canvas_name: ".cb-mapcanvas",
	map_canvas_width: "100%",
	map_canvas_height: "120px",
	map_canvas_text: "大きな地図で見る", // タグ使用可
	map_canvas_text_size: "14px",
	map_zoom: 13,
	map_type: "ROADMAP" // ROADMAP, SATELLITE, HYBRID, TERRAIN
});
```

#####オプションの説明
<dl>
	<dt>map_location_name</dt>
	<dd>位置情報を取得するためのtitle属性を指定する要素のClass属性値</dd>
	<dt>map_canvas_name</dt>
	<dd>地図を表示させる要素のClass属性値</dd>
	<dt>map_canvas_width</dt>
	<dd>表示させる地図の幅</dd>
	<dt>map_canvas_height</dt>
	<dd>表示させる地図の高さ</dd>
	<dt>map_canvas_text</dt>
	<dd>地図の下に表示されるGooleマップへのリンクのアンカーテキスト</dd>
	<dt>map_canvas_text_size</dt>
	<dd>地図の下に表示されるGooleマップへのリンクのアンカーテキストのサイズ</dd>
	<dt>map_zoom</dt>
	<dd>表示される地図の縮尺</dd>
	<dt>map_type</dt>
	<dd>表示される地図のタイプ [ROADMAP], [SATELLITE], [HYBRID], [TERRAIN]</dd>
</dl>


##＜デモ＞

[http://jsrun.it/maechabin/TLmG](http://jsrun.it/maechabin/TLmG)


##＜ライセンス＞

MIT license

##＜アップデート情報＞

###ver. 1.2

- 同一ページ内で複数の別要素に対してプラグインを実行できるようにしました。
- これによりそれぞれの要素にオプションを指定することができるようにしました。
- 位置情報を取得するためのtitle属性を指定する要素を、任意のclass属性値からcb-getlocationに固定しました。
- 位置情報を取得するためのtitle属性を指定する要素のclass属性値をオプションで指定できるようにしました。


