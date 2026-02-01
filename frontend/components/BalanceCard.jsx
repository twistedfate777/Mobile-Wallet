import { View, Text, ActivityIndicator } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";

export const BalanceCard = ({ summary }) => {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total Balance</Text>
      {summary.balance === undefined ? (
        <ActivityIndicator size={"small"} color={COLORS.primary} />
      ) : (
        <Text style={styles.balanceAmount}>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(summary.balance)}
        </Text>
      )}

      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Income</Text>
          {summary.income === undefined ? (
            <ActivityIndicator size={"small"} color={COLORS.primary} />
          ) : (
            <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
              +
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(summary.income)}
            </Text>
          )}
        </View>
        <View style={[styles.balanceStatItem, styles.statDivider]} />
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Expenses</Text>
          {summary.expenses === undefined ? (
            <ActivityIndicator size={"small"} color={COLORS.primary} />
          ) : (
            <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(summary.expenses)}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};
