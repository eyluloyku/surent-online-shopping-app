import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    borderBottomStyle: 'solid',
    marginBottom: 10,
  },
  label: {
    width: '30%',
    fontWeight: 'bold',
    fontSize: 10,
  },
  value: {
    width: '70%',
    fontSize: 10,
  },
  sectionTitle: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
    textDecoration: 'underline',
  },
  section: {
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  tableColumn: {
    width: '50%',
    fontSize: 10,
  },
  totalPrice: {
    textAlign: 'right',
    marginTop: 15,
    fontSize: 12,
  },
  coloredBar: {
    height: 10,
    backgroundColor: '#3f51b5',
    marginBottom: 20,
  },
});


const InvoicePDF = {
  async generateInvoice(data) {
    const blob = await pdf(<InvoiceDocument data={data} />).toBlob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Invoice-${data.invoiceNumber}.pdf`;
    link.click();
  },
};

const InvoiceDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.coloredBar}></View>
      <Text style={styles.header}>Invoice</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {'\u{1F4CA}'} Company Information
        </Text>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>SUrent</Text>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>+90 123 456 7890</Text>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>Tuzla Istanbul Sabanci Univ</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Client Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Client Name:</Text>
          <Text style={styles.value}>{data.name} {data.lastName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{data.email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Country:</Text>
          <Text style={styles.value}>{data.country}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>City:</Text>
          <Text style={styles.value}>{data.City}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Zipcode:</Text>
          <Text style={styles.value}>{data.Zipcode}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Telephone:</Text>
          <Text style={styles.value}>{data.Telephone}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Billing Information</Text>
        {/* Add billing information rows here */}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Items</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableColumn, styles.label]}>Item</Text>
          <Text style={[styles.tableColumn, styles.label]}>Price</Text>
        </View>
        {/* Add dummy items */}
        <View style={styles.tableRow}>
          <Text style={[styles.tableColumn, styles.value]}>Item 1</Text>
          <Text style={[styles.tableColumn, styles.value]}>$10.00</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableColumn, styles.value]}>Item 2</Text>
          <Text style={[styles.tableColumn, styles.value]}>$20.00</Text>
        </View>
      </View>
      <Text style={styles.totalPrice}>Total Price: $30.00</Text>
    </Page>
  </Document>
);



export default InvoicePDF;

       
