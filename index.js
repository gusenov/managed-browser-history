(function () {
    'use strict';
    
    // https://stackoverflow.com/a/30458400/2289640
    Date.prototype.yyyymmddhhmmss = function () {
        var yyyy = this.getFullYear(),
            mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1), // getMonth() is zero-based
            dd  = this.getDate() < 10 ? "0" + this.getDate() : this.getDate(),
            hh = this.getHours() < 10 ? "0" + this.getHours() : this.getHours(),
            min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes(),
            ss = this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds();
        return "".concat(yyyy + "-").concat(mm + "-").concat(dd + " ").concat(hh + ":").concat(min + ":").concat(ss);
    };
    
    // https://stackoverflow.com/a/23945027/2289640
    function extractHostname(url) {
        var hostname;
        //find & remove protocol (http, ftp, etc.) and get hostname

        if (url.indexOf("://") > -1) {
            hostname = url.split('/')[2];
        } else {
            hostname = url.split('/')[0];
        }

        //find & remove port number
        hostname = hostname.split(':')[0];
        //find & remove "?"
        hostname = hostname.split('?')[0];

        return hostname;
    }
    
    function createTableWithLinks(links) {
        var table = document.createElement('table'),
            tbody = document.createElement('tbody'),
            tr,
            td,
            img,
            a,
            em,
            i,
            cdate,
            udate,
            col_date_created_width = '128px',
            col_last_updated_width = '128px',
            col_icon_width = '24px';

        table.style.width = '100%';
        table.setAttribute('border', '1');
        table.setAttribute('cellpadding', '10');
        table.setAttribute('bordercolor', 'LightSlateGray');
        table.setAttribute('cellspacing', '10');
        table.style.borderCollapse = 'collapse';
        
        tr = document.createElement('tr');
        td = document.createElement('td');
        td.style.width = col_date_created_width;
        td.appendChild(document.createTextNode('Date created'));
        tr.appendChild(td);
        td = document.createElement('td');
        td.style.width = col_last_updated_width;
        td.appendChild(document.createTextNode('Last updated'));
        tr.appendChild(td);
        td = document.createElement('td');
        td.style.width = col_icon_width;
        td.appendChild(document.createTextNode('Icon'));
        tr.appendChild(td);
        td = document.createElement('td');
        td.appendChild(document.createTextNode('Link'));
        tr.appendChild(td);
        tbody.appendChild(tr);
        
        for (i = links.length - 1; i >= 0; i -= 1) {
            tr = document.createElement('tr');

            cdate = new Date(links[i].cdate);
            td = document.createElement('td');
            td.style.width = col_date_created_width;
            td.appendChild(document.createTextNode(cdate.yyyymmddhhmmss()));
            tr.appendChild(td);
            
            udate = new Date(links[i].udate);
            td = document.createElement('td');
            td.style.width = col_last_updated_width;
            td.appendChild(document.createTextNode(udate.yyyymmddhhmmss()));
            tr.appendChild(td);

            img = document.createElement('img');
            img.src = 'https://www.google.com/s2/favicons?domain_url=' + extractHostname(links[i].url);
            td = document.createElement('td');
            td.style.width = col_icon_width;
            td.appendChild(img);
            tr.appendChild(td);
            
            a = document.createElement('a');
            a.setAttribute('href', links[i].url);
            a.innerHTML = links[i].title;
            em = document.createElement('em');
            em.appendChild(document.createTextNode(links[i].url));
            
            td = document.createElement('td');
            td.appendChild(a);
            td.appendChild(document.createElement('br'));
            td.appendChild(em);
            tr.appendChild(td);

            tbody.appendChild(tr);
        }

        table.appendChild(tbody);
        document.getElementById('links').appendChild(table);
    }
    
    function historyChangedCallback() {
        // Do nothing.
    }
    
    document.addEventListener('DOMContentLoaded', function () {
        var historyStorage = new WebStore(localStorage, 'link', historyChangedCallback),
            links = historyStorage.getAllRecords();
        createTableWithLinks(links);
    });

}());

