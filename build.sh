version=$(jq --raw-output '.version' manifest.json)
newVersion=$(./increment_version.sh $version)
jq ".version = \"$newVersion\"" manifest.json | sponge manifest.json

release="ManagedBrowserHistory-$newVersion.zip"

if [ ! -f $release ]; then
    :
else
    rm $release
fi

zip --quiet -r $release \
                "node_modules/web-store/web-store.js" \
                "images/History-Folder-Willow-icon_16.png" \
                "images/History-Folder-Willow-icon_48.png" \
                "images/History-Folder-Willow-icon_128.png" \
                "images/History-Folder-Sakura-icon_16.png" \
                "images/History-Folder-Sakura-icon_32.png" \
                "images/History-Folder-Sakura-icon_48.png" \
                "images/History-Folder-Graphite-icon_16.png" \
                "images/History-Folder-Graphite-icon_32.png" \
                "images/History-Folder-Graphite-icon_48.png" \
                "images/History-Folder-Willow-icon_128.png"\
                "index.html" \
                "index.js" \
                "background.html" \
                "background.js" \
                "styles.css" \
                "manifest.json"

echo $release
