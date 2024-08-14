export enum ImageEnum {
  Background = 'Background',
  DeckBackground = 'DeckBackground',
  StoneButtonFrame = 'StoneButtonFrame',
  StoneButtonHovered = 'StoneButtonHovered',
  StoneButtonReady = 'StoneButtonReady',
  ButtonBeige = 'ButtonBeige',
  PanelBeige = 'PanelBeige',
  DonCard = 'DonCard',
  ST01_001_Card = 'ST01-001',
  ST01_002_Card = 'ST01-002',
  ST01_003_Card = 'ST01-003',
  ST01_004_Card = 'ST01-004',
  ST01_005_Card = 'ST01-005',
  ST01_006_Card = 'ST01-006',
  ST01_007_Card = 'ST01-007',
  ST01_008_Card = 'ST01-008',
  ST01_009_Card = 'ST01-009',
  ST01_010_Card = 'ST01-010',
  ST01_011_Card = 'ST01-011',
  ST01_012_Card = 'ST01-012',
  ST01_013_Card = 'ST01-013',
  ST01_014_Card = 'ST01-014',
  ST01_015_Card = 'ST01-015',
  ST01_016_Card = 'ST01-016',
  ST01_017_Card = 'ST01-017',
}

export function getImageEnum(value: string): string {
  const enumValue = Object.values(ImageEnum).find(enumValue => enumValue === value);
  return enumValue ?? '';
}

const apiResponse = 'ST01-001';

const imageEnumValue = getImageEnum(apiResponse);

if (imageEnumValue) {
  console.log('O valor é um valor válido do enum:', imageEnumValue);
} else {
  console.log('O valor não é um valor válido do enum.');
}
