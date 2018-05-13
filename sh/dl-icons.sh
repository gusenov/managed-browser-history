#!/bin/bash

#set -x  # echo on

iconarchive_downloader_sh="~/repo/lang/sh/iconarchive-downloader-sh/iconarchive.sh"
eval iconarchive_downloader_sh=$iconarchive_downloader_sh

output_dir="./images/icons"

rm -rf ./images/icons/*

# http://www.iconarchive.com/show/smooth-leopard-icons-by-mcdo-design.2.html
function smooth_leopard_icons_by_mcdo_design() {
	base_url="http://www.iconarchive.com/show/smooth-leopard-icons-by-mcdo-design"

	"$iconarchive_downloader_sh" -u="$base_url/History-Folder-Willow-icon.html" -o="$output_dir"
	"$iconarchive_downloader_sh" -u="$base_url/History-Folder-Graphite-icon.html" -o="$output_dir"
	"$iconarchive_downloader_sh" -u="$base_url/History-Folder-Sakura-icon.html" -o="$output_dir"
}

# http://www.iconarchive.com/show/origami-colored-pencil-icons-by-double-j-design.1.html
function origami_colored_pencil_icons_by_double_j_design() {
	base_url="http://www.iconarchive.com/show/origami-colored-pencil-icons-by-double-j-design"

	"$iconarchive_downloader_sh" -u="$base_url/red-disk-icon.html" -o="$output_dir" -s="16,48,128"

	"$iconarchive_downloader_sh" -u="$base_url/blue-star-icon.html" -o="$output_dir" -s="16"
	"$iconarchive_downloader_sh" -u="$base_url/blue-clock-icon.html" -o="$output_dir" -s="16"
	"$iconarchive_downloader_sh" -u="$base_url/blue-laptop-icon.html" -o="$output_dir" -s="16"
	"$iconarchive_downloader_sh" -u="$base_url/blue-ok-icon.html" -o="$output_dir" -s="16"

	"$iconarchive_downloader_sh" -u="$base_url/green-star-icon.html" -o="$output_dir" -s="16"
	"$iconarchive_downloader_sh" -u="$base_url/green-clock-icon.html" -o="$output_dir" -s="16"
	"$iconarchive_downloader_sh" -u="$base_url/green-laptop-icon.html" -o="$output_dir" -s="16"
	"$iconarchive_downloader_sh" -u="$base_url/green-ok-icon.html" -o="$output_dir" -s="16"
}

# http://www.iconarchive.com/show/soft-scraps-icons-by-hopstarter.1.html
function soft_scraps_icons_by_hopstarter() {
	base_url="http://www.iconarchive.com/show/soft-scraps-icons-by-hopstarter"

	#"$iconarchive_downloader_sh" -u="$base_url/Button-Favorite-icon.html" -o="$output_dir" -s="16,48,128"

	"$iconarchive_downloader_sh" -u="$base_url/Button-Blank-Gray-icon.html" -o="$output_dir" -s="16"	
	"$iconarchive_downloader_sh" -u="$base_url/Button-Blank-Blue-icon.html" -o="$output_dir" -s="16"
	
	"$iconarchive_downloader_sh" -u="$base_url/Button-Blank-Green-icon.html" -o="$output_dir" -s="16"	
	"$iconarchive_downloader_sh" -u="$base_url/Button-Blank-Yellow-icon.html" -o="$output_dir" -s="16"
	"$iconarchive_downloader_sh" -u="$base_url/Button-Blank-Red-icon.html" -o="$output_dir" -s="16"
}

# http://www.iconarchive.com/show/large-time-icons-by-aha-soft.html
function large_time_icons_by_aha_soft() {
	base_url="http://www.iconarchive.com/show/large-time-icons-by-aha-soft"

	"$iconarchive_downloader_sh" -u="$base_url/Time-disabled-icon.html" -o="$output_dir" -s="16"
	"$iconarchive_downloader_sh" -u="$base_url/Time-icon.html" -o="$output_dir" -s="16"
}

# http://www.iconarchive.com/show/flatastic-2-icons-by-custom-icon-design.html
function flatastic_2_icons_by_custom_icon_design() {
	base_url="http://www.iconarchive.com/show/flatastic-2-icons-by-custom-icon-design"

	"$iconarchive_downloader_sh" -u="$base_url/star-full-icon.html" -o="$output_dir" -s="16,48,128"
}

soft_scraps_icons_by_hopstarter
flatastic_2_icons_by_custom_icon_design

