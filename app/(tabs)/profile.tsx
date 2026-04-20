import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface AchievementBadge {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
  color: string;
}

const achievements: AchievementBadge[] = [
  {
    id: "1",
    name: "First Steps",
    icon: "checkmark-circle",
    unlocked: true,
    color: "#2ECC71",
  },
  {
    id: "2",
    name: "Week Warrior",
    icon: "flame",
    unlocked: true,
    color: "#F39C12",
  },
  {
    id: "3",
    name: "Problem Solver",
    icon: "bulb",
    unlocked: true,
    color: "#3498DB",
  },
  {
    id: "4",
    name: "Speed Demon",
    icon: "flash",
    unlocked: false,
    color: "#95A5A6",
  },
  {
    id: "5",
    name: "Master Mind",
    icon: "trophy",
    unlocked: false,
    color: "#95A5A6",
  },
  {
    id: "6",
    name: "100 Days",
    icon: "calendar",
    unlocked: false,
    color: "#95A5A6",
  },
];

export default function Profile() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <Animated.View
        style={[
          styles.profileHeader,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#FFFFFF" />
          </View>
          <View style={styles.onlineIndicator} />
        </View>

        <Text style={styles.userName}>Alex Johnson</Text>
        <Text style={styles.userLevel}>Level 8 • Expert Developer</Text>

        <Pressable style={styles.editButton}>
          <Ionicons name="create-outline" size={16} color="#1E5631" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </Pressable>
      </Animated.View>

      {/* Stats Grid */}
      <Animated.View
        style={[
          styles.statsGrid,
          {
            opacity: fadeAnim,
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 30],
                  outputRange: [10, 0],
                }),
              },
            ],
          },
        ]}
      >
        <StatBox label="Problems Solved" value="25" color="#2ECC71" />
        <StatBox label="Current Streak" value="5 days" color="#F39C12" />
        <StatBox label="Global Rank" value="#120" color="#3498DB" />
        <StatBox label="Total Points" value="1,420" color="#9B59B6" />
      </Animated.View>

      {/* Activity Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityCard}>
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons name="checkmark" size={20} color="#2ECC71" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>
                Solved "Longest Palindrome"
              </Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons name="flame" size={20} color="#F39C12" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>5 day streak achieved!</Text>
              <Text style={styles.activityTime}>1 day ago</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons name="star" size={20} color="#F39C12" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>
                Completed "Trees" learning path
              </Text>
              <Text style={styles.activityTime}>3 days ago</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Achievements Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementGrid}>
          {achievements.map((badge) => (
            <Pressable
              key={badge.id}
              style={[
                styles.achievementBadge,
                !badge.unlocked && styles.badgeLocked,
              ]}
            >
              <View
                style={[
                  styles.badgeIcon,
                  { backgroundColor: badge.color + "20" },
                ]}
              >
                <Ionicons
                  name={badge.icon as any}
                  size={24}
                  color={badge.color}
                />
              </View>
              <Text style={styles.badgeName}>{badge.name}</Text>
              {!badge.unlocked && (
                <View style={styles.lockIcon}>
                  <Ionicons name="lock-closed" size={12} color="#95A5A6" />
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Pressable style={styles.settingsItem}>
          <Ionicons name="settings-outline" size={20} color="#1E5631" />
          <Text style={styles.settingsText}>Settings</Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="#D0D8D4"
            style={{ marginLeft: "auto" }}
          />
        </Pressable>

        <Pressable style={styles.settingsItem}>
          <Ionicons name="help-circle-outline" size={20} color="#1E5631" />
          <Text style={styles.settingsText}>Help & Support</Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="#D0D8D4"
            style={{ marginLeft: "auto" }}
          />
        </Pressable>

        <Pressable style={styles.settingsItem}>
          <Ionicons name="log-out-outline" size={20} color="#E74C3C" />
          <Text style={[styles.settingsText, { color: "#E74C3C" }]}>
            Logout
          </Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="#D0D8D4"
            style={{ marginLeft: "auto" }}
          />
        </Pressable>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

interface StatBoxProps {
  label: string;
  value: string;
  color: string;
}

function StatBox({ label, value, color }: StatBoxProps) {
  return (
    <View style={[styles.statBox, { borderTopColor: color }]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFBF9",
  },
  profileHeader: {
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 28,
    borderBottomWidth: 1,
    borderBottomColor: "#E8EFE8",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#1E5631",
    justifyContent: "center",
    alignItems: "center",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#2ECC71",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  userName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1E5631",
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  userLevel: {
    fontSize: 13,
    color: "#7A8480",
    fontWeight: "500",
    marginBottom: 16,
    letterSpacing: 0.2,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#F0F5F2",
    borderRadius: 12,
  },
  editButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1E5631",
  },
  statsGrid: {
    paddingHorizontal: 20,
    marginVertical: 24,
    gap: 12,
  },
  statBox: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderTopWidth: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E5631",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: "#7A8480",
    fontWeight: "500",
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E5631",
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  activityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F5F2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1E5631",
  },
  activityTime: {
    fontSize: 11,
    color: "#7A8480",
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#E8EFE8",
  },
  achievementGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  achievementBadge: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  badgeLocked: {
    opacity: 0.6,
  },
  badgeIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1E5631",
    textAlign: "center",
  },
  lockIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#FFFFFF",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  settingsText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E5631",
  },
});