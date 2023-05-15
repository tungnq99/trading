import React, { useEffect, useState } from 'react';
import { widget } from '../charting_library';
import BinanceDatafeed from '../datafeed';
const defaults = {
    symbol: 'ETHUSDT',
    interval: '60',
    containerId: 'tv_chart_container',
    datafeedUrl: 'https://demo_feed.tradingview.com',
    libraryPath: '/charting_library/',
    chartsStorageUrl: 'https://saveload.tradingview.com',
    chartsStorageApiVersion: '1.1',
    clientId: 'tradingview.com',
    userId: 'public_user_id',
    fullscreen: false,
    autosize: true,
    drawings: { type: 'black', tools: [{ name: 'Regression Trend' }] },
};

const Chart = (params) => {
    const [twWidget, setTwWidget] = useState();
    useEffect(() => {
        const widgetOptions = {
            symbol: defaults.symbol,
            // BEWARE: no trailing slash is expected in feed URL
            datafeed: new BinanceDatafeed({ debug: false }),
            interval: defaults.interval,
            container_id: defaults.containerId,
            library_path: defaults.libraryPath,
            locale: 'en',
            drawings_access: defaults.drawings,
            disabled_features: ['use_localstorage_for_settings'],
            enabled_features: ['study_templates'],
            charts_storage_url: defaults.chartsStorageUrl,
            charts_storage_api_version: defaults.chartsStorageApiVersion,
            client_id: defaults.clientId,
            user_id: defaults.userId,
            fullscreen: defaults.fullscreen,
            autosize: defaults.autosize,
            theme: 'Dark',
            customFields: [
                {
                    inputType: 'TextWithCheckBox',
                    id: '2410',
                    title: 'Digital Signature',
                    placeHolder: 'Enter your personal digital signature',
                    value: {
                        text: '',
                        checked: false,
                    },
                    customInfo: {
                        asterix: true,
                        checkboxTitle: 'Save',
                    },
                }
            ]
        };
      
        const tvWidget = new widget(widgetOptions);
        setTwWidget(tvWidget);
        tvWidget.onChartReady(() => {
            tvWidget.activeChart().createShape({ price: 1800 }, { shape: 'horizontal_line' });
            tvWidget.headerReady().then(() => {
            });
        });
        return () => {
            if (twWidget) {
                twWidget.remove();
                setTwWidget(null);
            }
        };
    }, []);
    return <div className='chart' id={defaults.containerId}></div>;
};

export default Chart;
