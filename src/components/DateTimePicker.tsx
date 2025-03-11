
"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from "../constants/colors"

interface DateTimePickerProps {
  isVisible: boolean
  onClose: () => void
  onSelect: (dateTime: string) => void
}

type Mode = "date" | "time"
type TimeMode = "hour" | "minute"

export function DateTimePicker({ isVisible, onClose, onSelect }: DateTimePickerProps) {
  const [mode, setMode] = useState<Mode>("date")
  const [timeMode, setTimeMode] = useState<TimeMode>("hour")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedHour, setSelectedHour] = useState(11)
  const [selectedMinute, setSelectedMinute] = useState(30)
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">("AM")
  const [showYearPicker, setShowYearPicker] = useState(false)

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const weekDaysShort = ["S", "M", "T", "W", "T", "F", "S"]

  // Reset to date mode when modal opens
  useEffect(() => {
    if (isVisible) {
      setMode("date")
      setTimeMode("hour")
      setShowYearPicker(false)
    }
  }, [isVisible])

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = new Date(year, month, 1).getDay()

    const days = []
    // Add empty spaces for days before the first of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const handleDateSelect = (day: number) => {
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)
    setSelectedDate(newDate)
  }

  const handleYearSelect = (year: number) => {
    const newDate = new Date(year, selectedDate.getMonth(), selectedDate.getDate())
    setSelectedDate(newDate)
    setShowYearPicker(false)
  }

  const handleHourSelect = (hour: number) => {
    setSelectedHour(hour)
    setTimeMode("minute")
  }

  const handleMinuteSelect = (minute: number) => {
    setSelectedMinute(minute)
  }

  const handleSave = () => {
    if (mode === "date") {
      setMode("time")
      setTimeMode("hour")
    } else {
      const formattedDate = `${weekDays[selectedDate.getDay()].slice(0, 3)}, ${
        months[selectedDate.getMonth()]
      } ${selectedDate.getDate()}`
      const formattedMinute = selectedMinute < 10 ? `0${selectedMinute}` : selectedMinute
      const formattedTime = `${selectedHour}:${formattedMinute} ${selectedPeriod}`
      onSelect(`${formattedDate} - ${formattedTime}`)
      onClose()
    }
  }

  const handlePrevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))
  }

  // Generate years for year picker (current year ± 10 years)
  const generateYears = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      years.push(i)
    }
    return years
  }

  const renderYearPicker = () => (
    <View style={styles.yearPickerContainer}>
      <ScrollView style={styles.yearScrollView} showsVerticalScrollIndicator={false}>
        {generateYears().map((year) => (
          <TouchableOpacity
            key={`year-${year}`}
            style={[styles.yearItem, year === selectedDate.getFullYear() && styles.selectedYearItem]}
            onPress={() => handleYearSelect(year)}
          >
            <Text style={[styles.yearItemText, year === selectedDate.getFullYear() && styles.selectedYearItemText]}>
              {year}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )

  const renderDatePicker = () => (
    <View style={styles.datePickerContainer}>
      <TouchableOpacity onPress={() => setShowYearPicker(true)}>
        <Text style={styles.year}>{selectedDate.getFullYear()}</Text>
      </TouchableOpacity>
      <Text style={styles.selectedDate}>
        {`${weekDays[selectedDate.getDay()].slice(0, 3)}, ${months[selectedDate.getMonth()]} ${selectedDate.getDate()}`}
      </Text>

      {showYearPicker ? (
        renderYearPicker()
      ) : (
        <>
          <View style={styles.monthSelector}>
            <TouchableOpacity onPress={handlePrevMonth}>
              <Icon name="chevron-back" size={24} color={colors.text.primary} />
            </TouchableOpacity>
            <Text style={styles.month}>
              {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </Text>
            <TouchableOpacity onPress={handleNextMonth}>
              <Icon name="chevron-forward" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.calendar}>
            <View style={styles.weekDays}>
              {weekDaysShort.map((day, index) => (
                <Text key={`day-${index}`} style={styles.weekDay}>
                  {day}
                </Text>
              ))}
            </View>
            <View style={styles.calendarDays}>
              {generateCalendarDays().map((day, index) => (
                <TouchableOpacity
                  key={`day-${index}`}
                  style={[styles.calendarDay, day === selectedDate.getDate() && styles.selectedCalendarDay]}
                  onPress={() => day && handleDateSelect(day)}
                  disabled={!day}
                >
                  {day && (
                    <Text
                      style={[styles.calendarDayText, day === selectedDate.getDate() && styles.selectedCalendarDayText]}
                    >
                      {day}
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </>
      )}
    </View>
  )

  const renderHourPicker = () => (
    <View style={styles.timePickerContainer}>
      <View style={styles.timeDisplay}>
        <Text style={styles.timeText}>{selectedHour}</Text>
        <Text style={styles.timeColon}>:</Text>
        <Text style={styles.timeText}>{selectedMinute < 10 ? `0${selectedMinute}` : selectedMinute}</Text>
        <View style={styles.amPmContainer}>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === "AM" && styles.activePeriodButton]}
            onPress={() => setSelectedPeriod("AM")}
          >
            <Text style={[styles.periodText, selectedPeriod === "AM" && styles.activePeriodText]}>AM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === "PM" && styles.activePeriodButton]}
            onPress={() => setSelectedPeriod("PM")}
          >
            <Text style={[styles.periodText, selectedPeriod === "PM" && styles.activePeriodText]}>PM</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.clockContainer}>
        <View style={styles.clockFace}>
          {/* Clock Numbers for Hours */}
          {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((hour, index) => {
            const angle = index * 30 * (Math.PI / 180)
            const radius = 80 // Adjust based on your clock size
            const x = Math.sin(angle) * radius
            const y = -Math.cos(angle) * radius

            return (
              <TouchableOpacity
                key={`hour-${hour}`}
                style={[
                  styles.clockNumber,
                  {
                    transform: [{ translateX: x }, { translateY: y }],
                  },
                  (hour === selectedHour || (hour === 12 && selectedHour === 0)) && styles.selectedClockNumber,
                ]}
                onPress={() => handleHourSelect(hour === 12 ? 12 : hour)}
              >
                <Text
                  style={[
                    styles.clockNumberText,
                    (hour === selectedHour || (hour === 12 && selectedHour === 0)) && styles.selectedClockNumberText,
                  ]}
                >
                  {hour}
                </Text>
              </TouchableOpacity>
            )
          })}

          {/* Clock Hand */}
          <View style={styles.clockHandContainer}>
            <View style={styles.clockHandDot} />
            <View
              style={[
                styles.clockHand,
                {
                  transform: [{ rotate: `${(selectedHour % 12) * 30 - 90}deg` }, { translateX: 40 }],
                },
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  )

  const renderMinutePicker = () => (
    <View style={styles.timePickerContainer}>
      <View style={styles.timeDisplay}>
        <TouchableOpacity onPress={() => setTimeMode("hour")}>
          <Text style={styles.timeText}>{selectedHour}</Text>
        </TouchableOpacity>
        <Text style={styles.timeColon}>:</Text>
        <Text style={[styles.timeText, styles.activeTimeText]}>
          {selectedMinute < 10 ? `0${selectedMinute}` : selectedMinute}
        </Text>
        <View style={styles.amPmContainer}>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === "AM" && styles.activePeriodButton]}
            onPress={() => setSelectedPeriod("AM")}
          >
            <Text style={[styles.periodText, selectedPeriod === "AM" && styles.activePeriodText]}>AM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === "PM" && styles.activePeriodButton]}
            onPress={() => setSelectedPeriod("PM")}
          >
            <Text style={[styles.periodText, selectedPeriod === "PM" && styles.activePeriodText]}>PM</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.clockContainer}>
        <View style={styles.clockFace}>
          {/* Clock Numbers for Minutes (in 5-minute increments) */}
          {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((minute, index) => {
            const angle = index * 30 * (Math.PI / 180)
            const radius = 80 // Adjust based on your clock size
            const x = Math.sin(angle) * radius
            const y = -Math.cos(angle) * radius

            // Display text for the minute markers
            const minuteText = minute === 0 ? "00" : minute.toString()

            return (
              <TouchableOpacity
                key={`minute-${minute}`}
                style={[
                  styles.clockNumber,
                  {
                    transform: [{ translateX: x }, { translateY: y }],
                  },
                  minute === selectedMinute && styles.selectedClockNumber,
                ]}
                onPress={() => handleMinuteSelect(minute)}
              >
                <Text style={[styles.clockNumberText, minute === selectedMinute && styles.selectedClockNumberText]}>
                  {minuteText}
                </Text>
              </TouchableOpacity>
            )
          })}

          {/* Minute markers (for 1-minute increments) */}
          {Array.from({ length: 60 }).map((_, index) => {
            if (index % 5 === 0) return null // Skip the 5-minute markers as they're handled above

            const angle = index * 6 * (Math.PI / 180)
            const outerRadius = 90
            const innerRadius = 85
            const outerX = Math.sin(angle) * outerRadius
            const outerY = -Math.cos(angle) * outerRadius
            const innerX = Math.sin(angle) * innerRadius
            const innerY = -Math.cos(angle) * innerRadius

            return (
              <TouchableOpacity
                key={`minute-marker-${index}`}
                style={[
                  styles.minuteMarker,
                  {
                    transform: [{ translateX: (outerX + innerX) / 2 }, { translateY: (outerY + innerY) / 2 }],
                  },
                  index === selectedMinute && styles.selectedMinuteMarker,
                ]}
                onPress={() => handleMinuteSelect(index)}
              />
            )
          })}

          {/* Clock Hand */}
          <View style={styles.clockHandContainer}>
            <View style={styles.clockHandDot} />
            <View
              style={[
                styles.clockHand,
                {
                  transform: [{ rotate: `${selectedMinute * 6 - 90}deg` }, { translateX: 40 }],
                },
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  )

  const renderTimePicker = () => {
    return timeMode === "hour" ? renderHourPicker() : renderMinutePicker()
  }

  return (
    <Modal transparent visible={isVisible} animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.tabs}>
                <TouchableOpacity
                  style={[styles.tab, mode === "date" && styles.activeTab]}
                  onPress={() => setMode("date")}
                >
                  <Text style={[styles.tabText, mode === "date" && styles.activeTabText]}>DATE</Text>
                  {mode === "date" && <View style={styles.activeTabIndicator} />}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tab, mode === "time" && styles.activeTab]}
                  onPress={() => setMode("time")}
                >
                  <Text style={[styles.tabText, mode === "time" && styles.activeTabText]}>TIME</Text>
                  {mode === "time" && <View style={styles.activeTabIndicator} />}
                </TouchableOpacity>
              </View>

              <View style={styles.content}>{mode === "date" ? renderDatePicker() : renderTimePicker()}</View>

              <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton} onPress={onClose}>
                  <Text style={styles.cancelText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={handleSave}>
                  <Text style={styles.saveText}>SAVE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.9,
    maxHeight: height * 0.7,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
  },
  tabs: {
    flexDirection: "row",
    height: 50,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  activeTab: {
    borderBottomWidth: 0,
  },
  activeTabIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#800080",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#888888",
  },
  activeTabText: {
    color: "#800080",
  },
  content: {
    padding: 16,
  },
  datePickerContainer: {
    alignItems: "center",
  },
  year: {
    fontSize: 14,
    color: "#888888",
    marginBottom: 4,
    textDecorationLine: "none",
  },
  selectedDate: {
    fontSize: 28,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 16,
  },
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 8,
  },
  month: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
  },
  calendar: {
    width: "100%",
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  weekDay: {
    width: 40,
    textAlign: "center",
    fontSize: 14,
    color: "#888888",
  },
  calendarDays: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  calendarDay: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  selectedCalendarDay: {
    backgroundColor: "#DDDDDD",
    borderRadius: 20,
  },
  calendarDayText: {
    fontSize: 16,
    color: "#333333",
  },
  selectedCalendarDayText: {
    color: "#333333",
  },
  yearPickerContainer: {
    width: "100%",
    height: 200,
    marginTop: 16,
  },
  yearScrollView: {
    width: "100%",
  },
  yearItem: {
    paddingVertical: 12,
    alignItems: "center",
  },
  selectedYearItem: {
    backgroundColor: "#800080",
    borderRadius: 8,
  },
  yearItemText: {
    fontSize: 18,
    color: "#333333",
  },
  selectedYearItemText: {
    color: "white",
    fontWeight: "600",
  },
  timePickerContainer: {
    alignItems: "center",
  },
  timeDisplay: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  timeText: {
    fontSize: 36,
    fontWeight: "500",
    color: "#333333",
  },
  activeTimeText: {
    color: "#800080",
  },
  timeColon: {
    fontSize: 36,
    fontWeight: "500",
    color: "#333333",
    marginHorizontal: 4,
  },
  amPmContainer: {
    marginLeft: 12,
  },
  periodButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  activePeriodButton: {
    backgroundColor: "#800080",
    borderRadius: 4,
  },
  periodText: {
    fontSize: 14,
    color: "#888888",
  },
  activePeriodText: {
    color: "white",
  },
  clockContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  clockFace: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#EEEEEE",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  clockNumber: {
    position: "absolute",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  selectedClockNumber: {
    backgroundColor: "#800080",
  },
  clockNumberText: {
    fontSize: 16,
    color: "#333333",
  },
  selectedClockNumberText: {
    color: "white",
  },
  minuteMarker: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#888888",
  },
  selectedMinuteMarker: {
    backgroundColor: "#800080",
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  clockHandContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  clockHandDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
    position: "absolute",
    zIndex: 2,
  },
  clockHand: {
    position: "absolute",
    width: 80,
    height: 2,
    backgroundColor: "white",
    zIndex: 1,
    transformOrigin: "left center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  footerButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cancelText: {
    fontSize: 14,
    color: "#888888",
    fontWeight: "500",
  },
  saveText: {
    fontSize: 14,
    color: "#800080",
    fontWeight: "600",
  },
})

