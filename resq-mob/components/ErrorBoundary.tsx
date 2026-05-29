import React from "react";
import { View, Text, Button, ScrollView } from "react-native";

type State = { error: Error | null };

export default class ErrorBoundary extends React.Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  reset = () => this.setState({ error: null });

  render() {
    if (this.state.error) {
      return (
        <ScrollView contentContainerStyle={{ flex: 1, padding: 20 }}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>An error occurred</Text>
            <Text style={{ marginBottom: 12 }}>{this.state.error.message}</Text>
            <Text style={{ color: "#666", marginBottom: 20 }}>{String(this.state.error.stack)}</Text>
            <Button title="Try again" onPress={this.reset} />
          </View>
        </ScrollView>
      );
    }
    return this.props.children as React.ReactElement;
  }
}
