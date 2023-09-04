import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet } from 'react-native';

function FundamentalSection({ stockSymbol }) {
  const [stockData, setStockData] = useState(null);
  

  useEffect(() => {
    console.log("SYMBOL FUNDAMENTAL: ", stockSymbol);
    const fetchData = () => {
      try {
        axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSymbol}&apikey=MW06FYDMFXP889H7`)
          .then(response => {
            setStockData(response.data);
            console.log(response);
          })
          .catch(error => console.error('Error:', error));
      } catch (error) {
        console.error('Failed to fetch stock data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    stockData && (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text>{stockData.Description}</Text>
        </View>
        <View style={styles.data}>
          <View style={styles.general}>
            <Text style={styles.divTitle}>Fundamental data</Text>
            <Text>Type: {stockData.AssetType}</Text>
            <Text>Exchange: {stockData.Exchange}</Text>
            <Text>Country: {stockData.Country}</Text>
            <Text>Sector: {stockData.Sector}</Text>
            <Text>Industry: {stockData.Industry}</Text>
            <Text>ExDividendDate: {stockData.ExDividendDate}</Text>
            <Text>DividendDate: {stockData.DividendDate}</Text>
            <Text>Market Capitalization: {stockData.MarketCapitalization}</Text>
          </View>
          <View style={styles.fundamental}>
            <Text style={styles.divTitle}>Financial data</Text>
            <Text>EBITDA: {stockData.EBITDA}</Text>
            <Text>PERatio: {stockData.PERatio}</Text>
            <Text>DividendPerShare: {stockData.DividendPerShare}</Text>
            <Text>DividendYield: {stockData.DividendYield}</Text>
            <Text>EPS: {stockData.EPS}</Text>
            <Text>Beta: {stockData['Beta']}</Text>
          </View>
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  data: {
  },
  general: {
    marginBottom: 20,
  },
  fundamental: {
  },
  divTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default FundamentalSection;
