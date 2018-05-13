version=$(jq --raw-output '.version' manifest.json)
newVersion=$("./sh/increment_version.sh" $version)
jq ".version = \"$newVersion\"" manifest.json | sponge manifest.json
jq ".version_name = \"$newVersion beta\"" manifest.json | sponge manifest.json

release="./pack-ext/BookmarkManager-$newVersion.zip"

if [ ! -f $release ]; then
    :
else
    rm $release
fi

zip --quiet -r $release \
                "node_modules/web-store/web-store.js" \
                "images/icons/icons.iconarchive.com/icons/hopstarter/soft-scraps/16/Button-Blank-Red-icon.png" \
                "images/icons/icons.iconarchive.com/icons/hopstarter/soft-scraps/16/Button-Blank-Gray-icon.png" \
                "images/icons/icons.iconarchive.com/icons/hopstarter/soft-scraps/16/Button-Blank-Yellow-icon.png" \
                "images/icons/icons.iconarchive.com/icons/hopstarter/soft-scraps/16/Button-Blank-Blue-icon.png" \
                "images/icons/icons.iconarchive.com/icons/hopstarter/soft-scraps/16/Button-Blank-Green-icon.png" \
                "images/icons/icons.iconarchive.com/icons/custom-icon-design/flatastic-2/48/star-full-icon.png" \
                "images/icons/icons.iconarchive.com/icons/custom-icon-design/flatastic-2/16/star-full-icon.png" \
                "images/icons/icons.iconarchive.com/icons/custom-icon-design/flatastic-2/128/star-full-icon.png" \
                "html/popup.html" \
                "html/bookmarks.html" \
                "css/popup.css" \
                "css/bookmarks.css" \
                "js/shared.js" \
                "js/bookmarks.js" \
                "js/background.js" \
                "js/popup.js" \
                "_locales/en/messages.json" \
                "manifest.json"

echo $release
