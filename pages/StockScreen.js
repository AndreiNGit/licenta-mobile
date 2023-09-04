import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import FundamentalSection from '../components/FundamentalSection';

const API_URL = 'http://172.20.10.2:8080';

function StockScreen({ route }) {
  const { symbol } = route.params;
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/stock/${symbol}`)
      .then(response => {
        setStockData(response.data);
        // console.log(response.data);
        // console.log(`${apiUrl}/api/stock/${symbol}`);
      })
      .catch(error => {
        console.error(error);
      });
  }, [symbol]);

  if (!stockData || !stockData.closes || !stockData.predictedPrices) {
    return <Text>Loading...</Text>;
  }

  console.log(stockData.closes);
  console.log(`${API_URL}/api/stock/${symbol}`);

  const data = {
    datasets: [
      {
        data: stockData.closes.slice(-7),
        color: (opacity = 1) => `rgba(75,192,192,${opacity})`,
        strokeWidth: 2
      },
      {
        data: [...stockData.closes.slice(-7), ...stockData.predictedPrices],
        color: (opacity = 1) => `rgba(255,99,132,${opacity})`,
        strokeWidth: 2
      }
    ]
  };
  
  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  };

  return (
    <ScrollView>
      <Text style={StockMenuStyles.title}>{stockData.name}</Text>
      <FundamentalSection stockSymbol={symbol} />
      <Text style={StockMenuStyles.chartTitle}>Stock Price Chart</Text>
      <View style={StockMenuStyles.container}>
        <LineChart
          data={data}
          width={Dimensions.get("window").width-25} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={chartConfig}
          bezier
          style={StockMenuStyles.chart}
        />
      </View>
    </ScrollView>
  );
}

const StockMenuStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16
  }
  });

export default StockScreen;