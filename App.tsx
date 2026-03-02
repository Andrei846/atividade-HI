import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {

  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState<number | null>(null);
  const [classificacao, setClassificacao] = useState('');

  function calcularIMC() {
    const p = Number(peso);
    const a = Number(altura);

    if (!p || !a) {
      setClassificacao('Preencha peso e altura corretamente');
      setImc(null);
      return;
    }

    const resultado = p / (a * a);
    setImc(resultado);

    if (resultado < 18.5) {
      setClassificacao('Abaixo do peso');
    } else if (resultado < 24.9) {
      setClassificacao('Peso normal');
    } else if (resultado < 29.9) {
      setClassificacao('Sobrepeso');
    } else if (resultado < 34.9) {
      setClassificacao('Obesidade grau I');
    } else if (resultado < 39.9) {
      setClassificacao('Obesidade grau II');
    } else {
      setClassificacao('Obesidade grau III');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora de IMC</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua altura (m) Ex: 1.75"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />

      <Button title="Calcular IMC" onPress={calcularIMC} />

      {imc && (
        <>
          <Text style={styles.resultado}>
            Seu IMC é: {imc.toFixed(2)}
          </Text>
          <Text style={styles.classificacao}>
            Classificação: {classificacao}
          </Text>
        </>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    height: 40,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  resultado: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  classificacao: {
    marginTop: 10,
    fontSize: 16,
  },
});