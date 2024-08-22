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
  ST02_001_Card = 'ST02-001',
  ST02_002_Card = 'ST02-002',
  ST02_003_Card = 'ST02-003',
  ST02_004_Card = 'ST02-004',
  ST02_005_Card = 'ST02-005',
  ST02_006_Card = 'ST02-006',
  ST02_007_Card = 'ST02-007',
  ST02_008_Card = 'ST02-008',
  ST02_009_Card = 'ST02-009',
  ST02_010_Card = 'ST02-010',
  ST02_011_Card = 'ST02-011',
  ST02_012_Card = 'ST02-012',
  ST02_013_Card = 'ST02-013',
  ST02_014_Card = 'ST02-014',
  ST02_015_Card = 'ST02-015',
  ST02_016_Card = 'ST02-016',
  ST02_017_Card = 'ST02-017',
  ST03_001_Card = 'ST03-001',
  ST03_002_Card = 'ST03-002',
  ST03_003_Card = 'ST03-003',
  ST03_004_Card = 'ST03-004',
  ST03_005_Card = 'ST03-005',
  ST03_006_Card = 'ST03-006',
  ST03_007_Card = 'ST03-007',
  ST03_008_Card = 'ST03-008',
  ST03_009_Card = 'ST03-009',
  ST03_010_Card = 'ST03-010',
  ST03_011_Card = 'ST03-011',
  ST03_012_Card = 'ST03-012',
  ST03_013_Card = 'ST03-013',
  ST03_014_Card = 'ST03-014',
  ST03_015_Card = 'ST03-015',
  ST03_016_Card = 'ST03-016',
  ST03_017_Card = 'ST03-017',
  ST04_001_Card = 'ST04-001',
  ST04_002_Card = 'ST04-002',
  ST04_003_Card = 'ST04-003',
  ST04_004_Card = 'ST04-004',
  ST04_005_Card = 'ST04-005',
  ST04_006_Card = 'ST04-006',
  ST04_007_Card = 'ST04-007',
  ST04_008_Card = 'ST04-008',
  ST04_009_Card = 'ST04-009',
  ST04_010_Card = 'ST04-010',
  ST04_011_Card = 'ST04-011',
  ST04_012_Card = 'ST04-012',
  ST04_013_Card = 'ST04-013',
  ST04_014_Card = 'ST04-014',
  ST04_015_Card = 'ST04-015',
  ST04_016_Card = 'ST04-016',
  ST04_017_Card = 'ST04-017',
}

export function getImageEnum(value: string): string {
  const enumValue = Object.values(ImageEnum).find(enumValue => enumValue === value);
  return enumValue ?? '';
}
