import { TouchableOpacity, Text } from 'react-native';
import { IToggle } from '../../interfaces';
import { THEME } from '../../theme';
import { styles } from './styles';

export function Toggle({
  weekDayText,
  weekDayNumber,
  weekDays,
  handleSelectWeekDay,
}: IToggle) {
  return (
    <TouchableOpacity
      style={[
        styles.daysButton,
        weekDays.includes(weekDayNumber)
          ? {
              backgroundColor: THEME.COLORS.PRIMARY,
            }
          : null,
      ]}
      onPress={() => handleSelectWeekDay(weekDayNumber)}
    >
      <Text style={styles.daysButtonText}>{weekDayText}</Text>
    </TouchableOpacity>
  );
}
