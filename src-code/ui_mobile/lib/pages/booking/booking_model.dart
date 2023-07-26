import '/backend/api_requests/api_calls.dart';
import '/components/airports/airports_widget.dart';
import '/components/trip_date/trip_date_widget.dart';
import '/flutter_flow/flutter_flow_animations.dart';
import '/flutter_flow/flutter_flow_icon_button.dart';
import '/flutter_flow/flutter_flow_radio_button.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import '/flutter_flow/form_field_controller.dart';
import '/flutter_flow/custom_functions.dart' as functions;
import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:simple_gradient_text/simple_gradient_text.dart';

class BookingModel extends FlutterFlowModel {
  ///  Local state fields for this page.

  int adl = 1;

  int? chd = 0;

  int? inf = 0;

  int? remain = 5;

  String tripType = 'oneway';

  ///  State fields for stateful widgets in this page.

  final unfocusNode = FocusNode();
  // State field(s) for RadioButton widget.
  FormFieldController<String>? radioButtonValueController;
  // Stores action output result for [Bottom Sheet - Airports] action in Container widget.
  dynamic? origin;
  // Stores action output result for [Bottom Sheet - Airports] action in Container widget.
  dynamic? destination;
  // Stores action output result for [Bottom Sheet - TripDate] action in Container widget.
  DateTime? departDate;
  // Stores action output result for [Bottom Sheet - TripDate] action in Container widget.
  DateTime? returnDate;
  // Stores action output result for [Backend Call - API (searchFlight)] action in Button widget.
  ApiCallResponse? flightsResult;

  /// Initialization and disposal methods.

  void initState(BuildContext context) {}

  void dispose() {
    unfocusNode.dispose();
  }

  /// Action blocks are added here.

  /// Additional helper methods are added here.

  String? get radioButtonValue => radioButtonValueController?.value;
}
