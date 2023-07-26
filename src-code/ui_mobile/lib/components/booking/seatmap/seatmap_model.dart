import '/backend/api_requests/api_calls.dart';
import '/components/booking/seat/seat_widget.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

class SeatmapModel extends FlutterFlowModel {
  ///  Local state fields for this component.

  int? managingPax;

  ///  State fields for stateful widgets in this component.

  // Models for Seat dynamic component.
  late FlutterFlowDynamicModels<SeatModel> seatModels;
  // Stores action output result for [Backend Call - API (handleSeat)] action in Seat widget.
  ApiCallResponse? handSeatResult;

  /// Initialization and disposal methods.

  void initState(BuildContext context) {
    seatModels = FlutterFlowDynamicModels(() => SeatModel());
  }

  void dispose() {
    seatModels.dispose();
  }

  /// Action blocks are added here.

  /// Additional helper methods are added here.
}
