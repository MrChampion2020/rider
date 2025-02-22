import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export function DeliveryTimeline() {
  const timelineData = [
    {
      date: 'Feb 23',
      time: '01:23 AM',
      status: 'User ordered a delivery',
      location: 'Iseyin, Oyo state',
      completed: true,
    },
    {
      date: 'Feb 23',
      time: '01:23 AM',
      status: 'Package picked up',
      location: 'Iseyin, Oyo state',
      completed: true,
    },
    {
      date: 'Feb 23',
      time: '01:23 AM',
      status: 'Package in transit',
      location: 'Iseyin, Oyo state',
      completed: true,
    },
    {
      date: 'Feb 23',
      time: '01:23 AM',
      status: 'Package delivered',
      location: 'Iseyin, Oyo state',
      completed: false,
    },
  ];

  return (
    <View style={styles.container}>
      {timelineData.map((item, index) => (
        <View key={index} style={styles.timelineItem}>
          <View style={styles.timeSection}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
          
          <View style={styles.statusSection}>
            <View style={[
              styles.dot,
              { backgroundColor: item.completed ? '#9C27B0' : '#E0E0E0' }
            ]} />
            {index !== timelineData.length - 1 && (
              <View style={[
                styles.line,
                { backgroundColor: item.completed ? '#9C27B0' : '#E0E0E0' }
              ]} />
            )}
          </View>
          
          <View style={styles.contentSection}>
            <Text style={styles.status}>{item.status}</Text>
            <Text style={styles.location}>{item.location}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    width: '94%',
    alignSelf: 'center'
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timeSection: {
    width: 80,
  },
  date: {
    fontSize: 14,
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
  statusSection: {
    alignItems: 'center',
    marginRight: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#9C27B0',
  },
  line: {
    width: 0.5,
    flex: 1,
    backgroundColor: '#C3C3C3',
    marginVertical: 4,
  },
  contentSection: {
    flex: 1,
  },
  status: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  location: {
    fontSize: 12,
    color: '#666',
  },
});